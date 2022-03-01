const User = require('../Models/User');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
    return errors;
  }

  let maxAge = 3 * 24 * 60 * 60; //3 days in a seconds |'3d'| '
const createAccessToken = (id,role) => {
    return jwt.sign({id,role},process.env.ACCESS_TOKEN_SECRET,{expiresIn : maxAge})
}  

let signupPost = async (req, res) => {
    const { email,password } = req.body;

    try {
       const user = await User.create({email,password})
       const token = createAccessToken(user._id,user.role);
       res.cookie('JWT',token,{httpOnly: true,maxAge : maxAge * 1000})
       res.status(201).json(user);

    } catch (err) {
        console.log(err);
        // res.status(400).send('error,The User Not Created');
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

let loginPost = async (req, res) => {
     const { email,password } = req.body;
    try {
      const user = await User.login({email,password})
      if(user){
        const token = createAccessToken(user._id,user.role);
        res.cookie('JWT',token,{httpOnly: true,maxAge : maxAge * 1000})
        res.status(201).json({user : {id : user._id,role : user.role,accessToken : token.ACCESS_TOKEN_SECRET }});
      }
  
    } catch (error) {
      res.status(201).json({error : `${error}`});
    }
}

let logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  // res.redirect('/');
}


module.exports = {
    signupPost,
    loginPost,
    logout
};