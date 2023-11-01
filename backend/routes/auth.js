const { body, validationResult } = require('express-validator');
const express = require('express')
var router = express.Router()
const user = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_secret = 'iamayush'
const fetchuser = require('../middleware/middleware')

router.post('/createuser', [
  body('email', 'wrong email').isEmail(),
  body('name', 'wrong name').notEmpty(),
  // password must be at least 5 chars long
  body('password', 'wrong password').isLength({ min: 5 })
], async (req, res) => {
  sucess=false;
  try {

    //express validation documantion to check name,email and password whether they are correct or not
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ sucess, errors: errors.array() });
    }
    var User = await user.findOne({email: req.body.email })

    if (User) {
      return res.status(400).json({sucess, error: "this user is alredy exist" })
    }

    const salt = await bcrypt.genSalt(10);
    var hashsalt = bcrypt.hashSync(req.body.password, salt);

    User = await user.create({
      name: req.body.name,
      email: req.body.email,
      password: hashsalt
    });

    const data = {
      user: {
        id: user.id
      }
    }
    var authtoken = jwt.sign(data, jwt_secret);
    sucess=true;
    res.json({ sucess,authtoken });
  }

  catch (error) {
    res.status(500).json({ error: "Check your code" });
  }

});

///this is for login authentication


router.post('/login', [
  body('email', 'check email').isEmail(),
  body('password', 'your password is empty').exists()
], async (req, res) => {
  sucess = false;

  //express validation documantion to check name,email and password whether they are correct or not
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {

    const User = await user.findOne({ email })
    if (!User) {
      return res.status(400).json({ sucess, error: "Invalid credentials email" });
    }

    // const pass=User.password;
    // const a =  bcrypt.compare(pass,password);


    // if(!a)
    // {
    //   return res.status(400).json({ sucess,error: "Invalid credentials password" });

    // }
    const hashedPassword = User.password;
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordValid) {
      return res.status(400).json({ sucess, error: "Invalid credentials password" });
    }






    const data = {
      User: {
        id: User.id
      }
    };
    sucess = true;
    var authtoken = jwt.sign(data, jwt_secret);
    res.json({ sucess, authtoken });
  }

  catch (error) {
    res.status(500).json({ sucess, error: "Internal server error" });
  }
}
);

//Route 3 for fetching user detail

router.get('/getuser', fetchuser, async (req, res) => {
  try {
    UserId = req.User.id;
    const User = await user.findById(UserId).select("-password");
    res.send(User);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});










module.exports = router;