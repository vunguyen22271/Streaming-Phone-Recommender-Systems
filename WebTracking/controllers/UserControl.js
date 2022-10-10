const Users = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Payment = require("../models/PaymentModel");
const userControl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "Email is already in use." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters." });

      // Password encryption
      const passwordHash = await bcrypt.hash(password, 10);
      //res.json({password,passwordHash})

      // save  new user
      const newUser = await Users({name,email,password: passwordHash});
      await newUser.save();

      // then create jsonwebtoken to authentication
      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/user/refresh_token',
        maxAge: 7*24*60*60*1000 // 7d
    })
      res.json({ accessToken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });

      if (!user) return res.status(400).json({ msg: "Email is already in use." });

      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) return res.status(400).json({ msg: "Email or password is incorrect" });

      // if login successful create access token and refresh token for account
      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7*24*60*60*1000 // 7d
      });

      res.json({ accessToken });

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async(req,res) =>{
    try {
      res.clearCookie('refreshToken', {path:'/user/refresh_token'})

      return res.json({ msg:'Đã đăng xuất'})

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUser: async (req, res) =>{
    try {
        const user = await Users.findById(req.user.id).select('-password')
        if(!user) return res.status(400).json({ msg: 'Account does not exist' });
        res.json(user)
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllUser: async(req,res) =>{
    try {
        const users = await Users.find().select('-password')
        res.json(users)
    } catch (err) {
        return res.status(500).json({msg:err.message})
    }
  },
  refreshToken: (req, res) => {
    try { 
      const rf_token = req.cookies.refreshToken;
      //res.json({rf_token})
      if (!rf_token)
        return res.status(400).json({ msg: "Please login or register" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res.status(400).json({ msg: "Please login or register" });

        const accessToken = createAccessToken({ id: user.id });

        res.json({ accessToken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addCart: async(req, res) =>{
    try {
      const user = await Users.findById(req.user.id)
      if(!user) return res.status(400).json({ msg: "Account does not exist"})

      await Users.findOneAndUpdate({_id: req.user.id},{
        cart: req.body.cart
      })
      return res.json({msg: "Added success"})
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }, 
  history: async(req,res) =>{
    try {
      const history = await Payment.find({user_id: req.user.id})
      res.json(history)
    } catch (err) {
      return res.status(500).json({msg:err.message})
    }
  },
  // productId: async(req,res) =>{
  //   const key = "1"
  //   const value = req.body ? req.body._id:'';
  //   //const id = body._id;
  //   //console.log(body._id);

    
  //   return res.status(200).json({message: 'OK'});
  // }
};

// create a access token for new user or sign token for new user
const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "11m" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = userControl;
