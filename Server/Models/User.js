const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  role: {
    type: String,
    required: true,
    default: 'User'
  },
  lastLogin : {
    type : Date,
    default : Date.now(),
  },
  isLogin : {
    type : Boolean,
    default : false
  },
  refreshToken: String
},
  { timestamps: true }
);


userSchema.pre('save', async function (next) {
  // console.log('new User Is about To Be Add',this);
  // const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, 10);
  next()
})


const User = mongoose.model("User", userSchema);

module.exports = User;