const User = require('../Models/User');
const bcrypt = require('bcrypt');
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


let signupPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password })
    // const token = createAccessToken(user._id, user.role);
    // res.cookie('JWT', token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.status(201).json(user);

  } catch (err) {
    console.log(err);
    // res.status(400).send('error,The User Not Created');
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}

let loginPost = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    console.log(user);

    if (user) {
      const match = await bcrypt.compare(password,user.password);
      if (match) {

        const accessToken = jwt.sign({"userInfo": {"email": user.email,"role": user.role}},process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '10m' });
        const refreshToken = jwt.sign({"userInfo": {"email": user.email,"role": user.role }},process.env.REFRESH_TOKEN_SECRET,{ expiresIn: '1d' });

        // Saving refreshToken with current user
        user.refreshToken = refreshToken;
        await user.save();

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 ,secure: true }); 
        return res.json({ accessToken});
        
      }else{
          res.send({message : "Incorrect Password"}); /////do somthing 
      }

    } else {
      // return res.json({"message" : "Incorrect Email"});
       res.send({message : "Incorrect Email"}); /////do somthing 

    }
  } catch (error) {
    return res.status(201).json({error});
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