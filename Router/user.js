const express = require('express');
const router = express.Router();
const userController=require("../Controller/user");
const { auth } = require('../Middlewares/auth');
 
router.post('/register',userController.register)
router.post('/login',auth,userController.login)
router.post('/profile',auth,userController.getProfile)
router.post('/fund/add',auth,userController.addFunds)
router.get('/user/transection',auth,userController.getWalletTransactions)


module.exports = router;
