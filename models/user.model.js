const mongoose = require('mongoose')



let UserSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phonenumber: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    profileImage:{type:String, required:false},
    password: { type: String, required: true },
    date_created: { type: String, default: Date.now() },
    isAdmin: { type: Boolean, default: false }
})



let UserModel = mongoose.model('user', UserSchema)



module.exports = UserModel