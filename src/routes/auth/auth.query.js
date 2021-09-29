const jwt = require("jsonwebtoken");
const env = require("dotenv");
const bcrypt = require("bcryptjs");
const db = require("../../config/db");
const salt = bcrypt.genSaltSync(10);


env.config();
db.on("err", function (err) {
    console.log(err.toString());
});

exports.register = function register(req, res) {
    db.query(
        `INSERT INTO user (name, firstname, email, password, created_at) VALUES (?, ?, ?, ?, ?)`,
        [req.body.name, req.body.firstname, req.body.email, bcrypt.hashSync(req.body.password, salt), new Date()],
        function (err, result) {
            if (err) {
                console.log(err);
                res.status(400).json({
                    " msg ": "bad request"
                });
            }
            else {
                let token = jwt.sign({"id": result.insertId}, process.env.SECRET, {expiresIn: "4h"});
                res.status(200).json({Authorization: token});
            }
        }
    )
}

exports.login = function login(req, res) {
    db.query(
        "SELECT * FROM user WHERE email = ?", req.body.email,
        function (err, result) {
            if (!result[0] || err)
                res.status(404).json({
                    "msg": "Not Found"
                });
            else if (result && result[0] && result[0].password && bcrypt.compareSync(req.body.password, result[0].password)) {
                let token = jwt.sign({"id": result[0].id}, process.env.SECRET, {expiresIn: '4h'});
                res.status(200).json({Authorization: token});
            } else {
                res.status(400).json({
                    "msg": "bad request"
                });
            }
        }
    )
};