const User = require("../Model/user");
const WalletTransaction=require("../Model/walletTransection")
// Add funds to wallet
exports.addFunds = async (req, res) => {
    const { amount } = req.body;
    if (amount <= 0) {
      return res.status(400).json({ msg: 'Amount must be greater than zero' });
    }
    try {
      const user = await user.findById(req.decoded.user.id);
  
      user.wallet += amount;
      await user.save();
  
      const transaction = new WalletTransaction({
        user: req.decoded.user.id,
        amount,
        type: 'credit',
        description: 'Funds added to wallet',
      });
  
      await transaction.save();
      res.json({ msg: 'Funds added to wallet', wallet: user.wallet });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
  // Get wallet transactions
  exports.getWalletTransactions = async (req, res) => {
    try {
      const transactions = await WalletTransaction.find({ user: req.decoded.user.id }).sort({ date: -1 });
      res.json(transactions);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  