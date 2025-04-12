const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY

module.exports = function authenticationMiddleware(req, res, next) {
  const cookie = req.cookies; // get cookie from request
  console.log('authentication middleware')

  // no cookie found 
  if (!cookie) {
    return res.status(401).json({ message: "No Cookie provided" });
  }

  const token = cookie.token; // get token from cookie
  // no token found 
  if (!token) {
    return res.status(405).json({ message: "No token provided" });
  }

  // verify the token
  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      return res.status(403).json({ message: "Invalid token" });
    }
    
    req.user = decoded.user;
    next();
  });
};