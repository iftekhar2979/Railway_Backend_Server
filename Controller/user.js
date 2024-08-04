const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Model/user');
const WalletTransaction = require('../Model/walletTransection');
const { Error } = require('mongoose');

const TOKEN='88b16e0e2b6436b915fef2856c119522968bf2fca9a676e7fff06184501f2dbbd0e04fe456cca63f6e41743905a5aec46bcd3032b130fb4b612a606bc59441a8'

// Register a new user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if(!name || !email || !password){
    return res.status(400).send({error:"You have not Provided full Information for registration"})
  }
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      TOKEN,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ user:payload.user.id,token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Authenticate user & get token
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      TOKEN,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  // console.log(req)
  try {
    const user = await User.findById(req.decoded.user.id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  const { name, email } = req.body;

  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};



// Add funds to wallet
exports.addFunds = async (req, res) => {
  const { amount } = req.body;
  if (amount <= 0) {
    return res.status(400).json({ msg: 'Amount must be greater than zero' });
  }
  try {
    const user = await User.findById(req.decoded.user.id);

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
