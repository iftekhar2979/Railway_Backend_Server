const express = require('express');
const router = express.Router();
const userController=require("../Controller/user");
const { auth } = require('../Middlewares/auth');
 
router.post('/register',userController.register)
router.post('/login',userController.login)
router.post('/profile',auth,userController.getProfile)
// router.patch("/wallet",userController.updateProfile)
router.post('/fund/add',auth,userController.addFunds)
router.get('/user/transections',auth,userController.getWalletTransactions)


module.exports = router;
