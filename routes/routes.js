const express = require('express')
const session = require('express-session')
const router = express.Router()
const User = require('../models/mongo')
const adminControllers = require("../controllers/admin_controller")
const userControllers = require("../controllers/user_controller")


//user get
router.get("/", userControllers.loginPage)
router.get("/login", userControllers.getLogin)
router.get("/signup", userControllers.getSignup)


//user post
router.post("/login", userControllers.loginPost)
router.post('/signup', userControllers.signupPost)



//admin get
router.get('/add', adminControllers.getAdd)
router.get('/admin', adminControllers.getAdmin)
router.get('/dashboard', adminControllers.dashboardGet)
router.get('/edit/:id', adminControllers.editGet)
router.get('/delete/:id', adminControllers.deleteGet)
router.get("/adminLogout", adminControllers.adminLogout)
router.get("/logout-user", adminControllers.logoutUser)


//admin post
router.post("/admin", adminControllers.adminPost)
router.post('/add', adminControllers.addPost)
router.post('/update/:id', adminControllers.updatePost)



//home
router.get('/home',userControllers.getHome)

// router.get('/home',((req,res)=>{
//     console.log(44);
//     res.send("ok")
// }))


module.exports = router









