const express = require("express");
const router = express.Router();
const env = require("dotenv");
const {register, login} = require("./auth.query");

router.post("/register", (req, res) => {
    if (req.body.name && req.body.name && req.body.firstname && req.body.password)
        register(req, res);
    else
        res.status(400).json({
            "msg" : "bad request"
        });
});

router.post("/login", (req, res) => {
    if (req.body.email && req.body.password)
        login(req, res);
    else
        res.status(400).json({
            "msg": "bad request"
        });
});

module.exports = router;