const token = require("jsonwebtoken");
let ID = 0;

module.exports = function checkAuth(req, res, next) {
    auth = req.headers.authorization;
    if (auth !== undefined && auth.split(" ")[1]) {
        token.verify(auth.split(" ")[1], process.env.SECRET, (err, verifiedJwt) => {
            if(err){
                res.status(401).json({
                    "msg": "Token is not valid"
                });
            } else {
                ID = verifiedJwt.id;
                next();
            }
        });
    } else {
        res.status(401).json({
            "msg": "No token, authorization denied"
        });
    }
    return (false);
}

exports.ID = ID;