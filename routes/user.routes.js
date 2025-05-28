const express = require("express");
const {
  register,
  signUp,
  login,
  loginp,
  forgotPass,
  upload,
} = require("../controllers/user.controller");
const router = express.Router();

router.get("/register", register);

// app.post('/sign-up', async (req, res) => {
//     try{
//         let user = UserModel(req.body)
//         await user.save()
//         console.log(req.body);
//         res.redirect('/makins')
//     }catch(err){
//         console.log(err);
//         res.redirect('/makins')
//     }
// })

router.post("/sign-up", signUp);


router.get("/loginp", loginp);

router.post("/login", login);

router.post('/forgotPass', forgotPass)

router.post('/upload', upload)

module.exports = router;
