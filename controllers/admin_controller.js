const User = require("../models/mongo")


const credential = {
  email: "admin@gmail.com",
  password: "admin123"
}


//GET

exports.getAdd = (req, res) => {
  try {
    if(req.session.admin){
    res.render('add_user', { title: "Add Users" })
    }
  } catch (error) {
    console.log(error.message)
  }
  
}


exports.getAdmin = (req, res) => {
  if (req.session.admin) {
    res.redirect("/dashboard")
  } else {
    res.render('admin', ({ title: "Admin" }))
  }
}


exports.  dashboardGet = async (req, res) => {
  if (req.session.admin) {
    try {
      const users = await User.find().exec();
      res.render('index', {
        title: 'Home Page',
        users: users,
      });
    } catch (err) {
      res.json({ message: err.message });
    }
  } else {
    res.redirect("/admin")
  }
};



//edit user route

exports.editGet = async (req, res) => {
  if (req.session.admin) {
    try {
      const id = req.params.id;
      const user = await User.findById(id).select('+password');;
      console.log(user)
      if (user === null) {
        res.redirect('/');
      } else {
        res.render('edit_users', {
          title: 'Edit User',
          user: user,
        });
      }
    } catch (err) {
      res.redirect('/dashboard');

    }
  } else {
    res.redirect("/admin")
  }
}

//delete user
exports.deleteGet = async (req, res) => {
  try {
    const id = req.params.id;

    await User.findByIdAndRemove(id);

    req.session.message = {
      type: "info",
      message: "User deleted successfully",
    };
    res.redirect('/dashboard');
  } catch (err) {
    res.json({ message: err.message });
  }
}

//admin logout
exports.adminLogout = (req, res) => {
  req.session.destroy()
  res.redirect("/admin")
}

//userlogout
exports.logoutUser = (req, res) => {
  req.session.destroy()
  res.redirect("/login")
}



//POST

exports.adminPost = (req, res) => {
  if (req.body.email === credential.email && req.body.password === credential.password) {
    req.session.admin = true;
    res.redirect('/dashboard')

  } else {
    res.end("invalid username")
  }
};


exports.addPost = async (req, res) => {
  if (req.session.admin) {
    try {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
      });
      await user.save();
      req.session.message = {
        type: 'success',
        message: 'User added successfully',
      };
      res.redirect('/dashboard');

    } catch (err) {
      res.json({ message: err.message, type: 'danger' });
    }
  } else {
    res.redirect("/admin")
  }
};

//update user route

exports.updatePost = async (req, res) => {
  if (req.session.admin) {
    try {
      const id = req.params.id;

      await User.findByIdAndUpdate(id, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
      });

      req.session.message = {
        type: 'success',
        message: 'User updated successfully',
      };
      res.redirect('/dashboard');
    } catch (err) {
      res.json({ message: err.message, type: 'danger' });
    }
  } else {
    res.redirect("/admin")
  }
}

















