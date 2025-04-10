const jwt = require('jasonwebtoken');

const secretKey = 's1234rf,.lp';

// middleware function to authenticate user
function authenticateUser(req, res, next) {

}

// export middleware
module.exports = authenticateUser;