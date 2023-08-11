const User = require("../models/mongo")




// sign up


exports.signupPost = async (req, res) => {
    try {
        const existUser = await User.findOne({ email: req.body.email });
        if (existUser) {
            return res.send("This email already exist 'U CAN LOGIN")
        }
        const existPhone = await User.findOne({ phone: req.body.phone })
        if (existPhone) {
            return res.send("This phone number already exist ")
        }

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
        });

        const savedUser = await user.save();
        // console.log(savedUser);
        req.session.loggedIn = true;
        req.session.user = savedUser.name;

        res.redirect("/home");
    } catch (error) {
        console.error(error);
        // res.send("An error occurred")
    }
};



exports.getSignup = (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/home')
    } else {
        res.render("signup", { title: "Signup" })
    }
}



//login
exports.loginPost = async (req, res) => {
    try {
        const check = await User.findOne({ email: req.body.email })
        if (check.password === req.body.password) {
            req.session.user = check.name;
            req.session.loggedIn = true
            res.redirect("/home")
        } else {
            res.send("wrong password")
        // res.render("/login",{title:' ',login:'Invalid Data'})

        }
    } catch (error) {
        console.error(error);
        res.send("An error occurred");

    }
};


exports.getLogin = (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/home');
    }
    res.render("login", { title: "login" })
}


exports.loginPage = (req, res) => {
    if (req.session.user) {
        res.redirect("/home")
    } else {
        res.render("login")
    }
}


//home

function validate(req, res, next) {
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect('/login');
    }
}

exports.getHome= (validate,(req, res) => {
    if(req.session.user){
        res.render("home", { user: req.session.user });
    }else{
        res.redirect("/")
    }
})

