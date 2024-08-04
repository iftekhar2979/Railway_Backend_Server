const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Model/user');
const WalletTransaction = require('../Model/walletTransection');
const { Error } = require('mongoose');


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
      process.env.SECRET_TOKEN,
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
      process.env.SECRET_TOKEN,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {

    res.status(500).send({msg:"User not Logged in"});
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.decoded.user.id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    res.status(404).send({msg:"Profile not found"});
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  const id=req.params.id
  const { name, email } = req.body;

  if(!name || !email ){
    return res.status(404).json({msg:"Profile not upgradable without fullfill information of user"})
  }
  try {
    let user = await User.findByIdAndUpdate(id,req.body);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
  
    res.status(403).send({msg:"Use not updated!!!"});
  }
};

// Delete user profile
exports.deleteProfile = async (req, res) => {
  const id = req.params.id;
  try {
    let user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json({msg:"user removed"});
  } catch (err) {
  
    res.status(403).send({msg:"Use not removed!!!"});
  }
};


