const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "hG5jFA3Jkt8TnLbBEYFMX8L";

module.exports = (req, res, next) => {
    try
    {
        const token = req.headers.authorization.replace("Bearer ", "");
        console.log(token);
        req.userData = jwt.verify(token, JWT_SECRET);
        next();
    }
    catch (err)
    {
        return res.status(401).json({
           message: "Authentification Failed"
        });
    }
};