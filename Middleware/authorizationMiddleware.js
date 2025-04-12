// middleware function to check if the role of the request is authorized or not
function authorizeUser(roles) {
    try {
        return (req, res, next) => {
            // to ensure that the req.user exists (and req.user.role)
            if (!req.user || !req.user.role) {
                return res.status(401).json({ message: "Unauthorized: no user info found" });
            }

            // get user role from request
            const userRole = req.user.role;
            // check if user role is in the list of roles authorized or not
            if (!roles.includes(userRole)) {
                // not authorized
                return res.status(403).json({ message: "Unauthorized Access" });
            }
            next(); // call next middleware
        };
    } catch (err) {
        res.status(500).json({ message: "Authorization Error", error: err.message });
    }
}

// export the middleware
module.exports = authorizeUser;
