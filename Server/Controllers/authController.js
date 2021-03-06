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
    
    const hashedPwd = await bcrypt.hash(password, 10);
    //create and store the new user
    const user = await User.create({email, password : hashedPwd});
    user.isLogin = true;
    await user.save();

    const accessToken = jwt.sign({"userInfo": {"email": user.email,"role": user.role}},process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '15m' });
        // res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 ,secure: true }); 
    res.cookie('JWT', accessToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 ,secure: true }); 

    res.json({ accessToken});

    return res.status(201).send(user);

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
          
            const accessToken = jwt.sign({"userInfo": {"email": user.email,"role": user.role}},process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '1H' });
            // const refreshToken = jwt.sign({"userInfo": {"email": user.email,"role": user.role }},process.env.REFRESH_TOKEN_SECRET,{ expiresIn: '1d' });
          
            // Saving refreshToken with current user
            // user.refreshToken = refreshToken;
            user.isLogin = true;
            await user.save();
          
            // res.cookie('JWT', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 ,secure: true }); 
            res.cookie('JWT', accessToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 ,secure: true }); 
            return res.json({ accessToken});
          
          }else{
             return res.send({message : "Incorrect Password"}); 
          }

    } else {
      return res.send({message : "Incorrect Email"});
    }
  } catch (error) {
    return res.status(201).json({error});
  }
}

let logout = async (req, res) => {

    const cookies = req.cookies;
    console.log(cookies);
    if (!cookies?.JWT) return res.sendStatus(204); //No content
    // const refreshToken = cookies.JWT;
    // console.log(refreshToken);
    // Is refreshToken in db?
    // const foundUser = await User.findOne({ refreshToken }).exec();
    // const foundUser = await User.findOne({ refreshToken : refreshToken });
    // console.log(foundUser);

    // if (!foundUser) {
    //     res.clearCookie('JWT', { httpOnly: true, sameSite: 'None', secure: true });
    //     return res.sendStatus(204);
    // }

    // Delete refreshToken in db
    // foundUser.refreshToken = '';
    foundUser.isLogin = false;
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('JWT', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

module.exports = {
  signupPost,
  loginPost,
  logout
};