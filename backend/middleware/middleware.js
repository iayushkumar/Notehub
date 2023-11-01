const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_secret='iamayush'

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
  
    if (!token) {
      return res.status(401).json({ error: "Token is missing" });
    }
    
    try {
      const data = jwt.verify(token, jwt_secret);
      req.User = data.User;
      next();
    } catch (error) {
      res.status(401).json({ error: "Invalid or expired token. Please authenticate using a valid token." });
    }
  }
  
 module.exports=fetchuser;