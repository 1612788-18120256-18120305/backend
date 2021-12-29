const bcrypt = require('bcrypt');
const authenticate = require('../authenticate');
const User = require('../models/User');

module.exports = {
  // [POST] /auth/login
  postLogin: async (req, res) => {
    // console.log(req.body);
    const user = await User.findOne({ email: req.body.email });
    if (
      user &&
      (await bcrypt.compare(req.body.password, user ? user.password : ''))
    ) {
      const jwt = authenticate.getToken(user);
      res.json({
        code: res.statusCode,
        success: true,
        user,
        jwt,
      });
      // console.log("Logged in successfully");
    } else {
      // console.log("Email does not exist");
      res.json({
        code: res.statusCode,
        success: false,
        message: 'Incorrect email or password',
      });
    }
  },

  // [POST] /auth/register
  postRegister: async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.json({
        code: res.statusCode,
        success: false,
        message: 'The user already exists!',
      });
    } else {
      const newUser = new User(req.body);
      newUser.password = bcrypt.hashSync(req.body.password, 10);
      await newUser.save();
      res.json({
        code: res.statusCode,
        success: true,
        message: 'Successful account registration',
      });
    }
  },

  // [GET] /auth/:provider/token
  socialLogin: (req, res) => {
    if (req.user) {
      const jwt = authenticate.getToken(req.user);
      res.json({
        code: res.statusCode,
        success: true,
        user: req.user,
        jwt,
      });
    } else {
      res.json({
        code: res.statusCode,
        success: false,
        message: 'Unauthorized',
      });
    }
  },

  // [POST] /auth/admin/login
  postAdminLogin: async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if(!user) {
      return res.json({
        code: res.statusCode,
        success: false,
        message: 'The admin does not exist!',
      });
    }
    if(!bcrypt.compareSync(req.body.password, user.password)) {
      return res.json({
        code: res.statusCode,
        success: false,
        message: 'Incorrect password!',
      })
    }
    if(user.type !== 0) {
      return res.json({
        code: res.statusCode,
        success: false,
        message: 'You are not an admin!',
      })
    }
    const jwt = authenticate.getToken(user);
    res.status(200).json({
      code: res.statusCode,
      success: true,
      user,
      jwt,
    });
  },

  postCreateAdmin: async (req, res) => {
    const { email, password, name } = req.body;
    if(password.length > 16 || password.length < 8) {
      res.status(400).json({
        code: res.statusCode,
        success: false,
        message: 'Password must be 8-16 characters'
      })
    }
    const admin = await User.findOne({ email: email });
    if(admin) {
      res.status(400).json({
        code: res.statusCode,
        success: false,
        message: 'Email already existed!'
      })
    }
    const newAdmin = new User({
      email,
      password: bcrypt.hashSync(req.body.password, 10),
      name,
      type: 0
    })

    await newAdmin.save();
    res.status(201).json({
      code: res.statusCode,
      success: true,
      message: 'Create admin successfully!'
    })
  }
};
