const express = require('express');
const router = express.Router();
const userController=require("../Controller/user");
const { auth } = require('../Middlewares/auth');

 // @route    POST api/user/register
// @desc     Register a new user
// @access   Public
router.post('/register',userController.register)

// @route    POST api/user/login
// @desc     Login  user
// @access   Public
router.post('/login',userController.login)

// @route    POST api/user/profile
// @desc     Get Authenticate User
// @access   Private
router.post('/profile',auth,userController.getProfile)



module.exports = router;
