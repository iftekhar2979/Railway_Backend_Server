const express = require('express');
const router = express.Router();
const wallerController=require("../Controller/wallet");
const { auth } = require('../Middlewares/auth');

 // @route    POST api/wallet/add
// @desc     Add funds to user account
// @access   Private
router.post('/add',auth,wallerController.addFunds)
 // @route    Get api/wallet/transection
// @desc     Get all transection by the user
// @access   Private
router.get('/transection',auth,wallerController.getWalletTransactions)

module.exports = router;