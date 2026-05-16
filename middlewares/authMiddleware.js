const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authheader = req.headers.authorization

   if (!authheader || !authheader.toLowerCase().startsWith("bearer")) {
        return res.status(401).json({
            message: "No token, authorization denied"
        });
    }
    const token = authheader.split(" ")[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({
            message: "Token is not valid"
        });
    }
}
module.exports = authMiddleware