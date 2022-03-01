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
  }
},
  { timestamps: true }
);


userSchema.pre('save', async function (next) {
  // console.log('new User Is about To Be Add',this);
  // const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, 10);
  next()
})


// userSchema.statics.login = async (email, password){
//   // const user =  User.findOne(user => user.email === email);
//   const user = User.findOne({email})
//   console.log(user);
//   // console.log(user._conditions.email.email);
//   // console.log(user._conditions.email.password);
//   if (user) {
//     const auth = await bcrypt.compare(password, user.password);
//     if (auth) {
//       return user;
//     }
//     throw Error('Incorrect Password');

//   } else {
//     throw Error('Incorrect Email');
//   }
// }

const User = mongoose.model("User", userSchema);

module.exports = User;