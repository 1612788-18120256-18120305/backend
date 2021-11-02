const bcrypt = require('bcrypt');
const authenticate = require('../authenticate');
const User = require('../models/users.model');
module.exports = {
  getAllUsers: (req, res) => {
    res.json({data: []})
  },

  postLogin: async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email: email});
    if(user) {
      if(bcrypt.compareSync(password, user.password)) {
        const token = authenticate.getToken(user);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ success: true, currentUser: user , accessToken: token });
      }
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(401).json({ success: false, message: 'User or password incorrect!' });
    }
  },

  postSignup: async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if(user) {
      res.setHeader('Content-Type', 'application/json');
      res.status(406).json({ success: false, message: 'User already existed!' });
    } else {
      const newUser = new User(req.body);
      newUser.password = bcrypt.hashSync(req.body.password, 10);
      await newUser.save();
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ success: true, message: 'Signup successful'});
    }
  },

  socialLogin: (req, res) => {
    if(req.user) {
      const token = authenticate.getToken(req.user);
      res.setHeader('Content-type', 'application/json');
      res.statusCode = 200;
      res.json({success: true, currentUser: req.user, accessToken: token});
    } else {
      res.setHeader('Content-type', 'application/json');
      res.setStatus(401);
      res.json({success: false, message: 'Unauthorized'});
    }
  },

  getUserById: async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId)
    if(!user) {
      res.setHeader("Content-type", 'application/json');
      res.status(404).json({success: false, message: 'User not found'});
    } else {
      res.setHeader("Content-type", 'application/json');
      res.status(200).json(user);
    }
  }
}