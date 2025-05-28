const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");
const nodemailer = require("nodemailer");
const UserModel = require("../models/user.model");
const dotenv = require("dotenv");
dotenv.config();
let message;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET, // Click 'View API Keys' above to copy your API secret
});

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAIL_GMAIL,
    pass: process.env.NODEMAIL_PASS,
  },
});

const upload = (req, res) => {
  const { file } = req.body;
  cloudinary.v2.uploader.upload(file, (error, result) => {
    if (error) {
      console.log(error);
      console.log("cannot upload file at this moment");
      res.send({ status: false, message: "cannot upload file at this moment" });
    } else {
      console.log("file uploaded");
      console.log(result);
      res.send({ status: true, message: "file upload successfully" });
    }
  });
};

const register = (req, res) => {
  message = "register succesfully";
  res.render("register", { message });
};

const signUp = async (req, res) => {
  const { firstname, lastname, phonenumber, email, password } = req.body;

  let image;
  try {
    const saltRound = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, saltRound);
    console.log(hashedPassword);

   await cloudinary.v2.uploader.upload(profileImage, async(error, result) => {
      if (error) {
        console.log(error);
        console.log("cannot upload file at this moment");
        // res.send({
        //   status: false,
        //   message: "cannot upload file at this moment",
        // });
      } else {
        console.log("file uploaded");
        console.log(result.secure_url);
        image = result.secure_url
        res.send({ status: true, message: "file upload successfully" });
      }
    });

    let user = UserModel({
      firstname,
      lastname,
      phonenumber,
      email,
      password: hashedPassword,
      profileImage:image
    });

    await user.save();

    var mailOptions = {
      from: process.env.NODEMAIL_GMAIL,
      to: req.body.email,
      subject: "Welcom to Whisper My App",
      text: "Account creation successful, proceed to login!",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    message = "Account created succesfully";
    res.send({ status: true });
    // res.render("register", { message });
    // console.log(req.body);
    // res.redirect('/makins')
  } catch (err) {
    console.log(err.errorResponse.code);
    if (err.errorResponse.code == 11000) {
      message = "Email already in use";
      res.send({
        status: false,
        message: "cannot create your account at this time",
      });
    } else {
      res.send({
        status: false,
        message: "cannot create your account at this time",
      });
    }
  }
};

const loginpage = (req, res) => {
  message = "";
  res.render("login", { message });
};

const loginp = (req, res) => {
  message = "";
  res.render("loginp", { message });
};

const login = async (req, res) => {
  // const { email, password, phonenumber } = req.body
  const { loginId, password } = req.body;
  console.log(req.body);

  try {
    // let user;

    // let mail = req.body.loginId;
    // if (mail.includes("@")) {
    //   user = await UserModel.findOne({ email: req.body.loginId });
    // } else {
    //   user = await UserModel.findOne({ phonenumber: req.body.loginId });
    // }
    let user = await UserModel.findOne({ email: loginId });

    // if(!req.body.email && !req.body.phonenumber){
    //     message = 'please input a phnenumber or email'
    //     res.render('login', {message})
    // }

    // if(email){
    //     let user = await UserModel.findOne({ email })
    // }else{
    //     let user = await UserModel.findOne({ phonenumber })
    // }

    if (!user) {
      // console.log('no user with this email in database');
      // console.log(req.body);
      message = "invalid credentials";
      res.send({ message });
    } else {
      // console.log('user found');
      // console.log(req.body);
      let isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // console.log("user logged i succesfully");
        const token = jwt.sign({ id: user._id }, process.env.APP_PASS, {
          expiresIn: "1h",
        });
        res.send({ message: "sign in successful", token });
        // res.render("Dashboard");
      } else {
        console.log("invalid credentials");
        message = "invalid credentials";
        res.send({ message });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const forgotPass = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await UserModel.findOne({ email });
    if (user) {
      console.log(user);
      // res.send({status: true});

      const saltRound = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, saltRound);
      const updatedUser = await UserModel.findByIdAndUpdate(user._id, {
        password: hashedPassword,
      });

      if (updatedUser) {
        res.send({ status: true, message: "account updated successfully" });
      }
    }
  } catch (error) {
    res.send({ status: false, message: "cannot update info at this moment" });
  }
};

module.exports = {
  register,
  signUp,
  loginpage,
  loginp,
  login,
  forgotPass,
  upload,
};
