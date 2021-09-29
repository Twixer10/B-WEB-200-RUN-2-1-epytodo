const express = require("express");
const router = express.Router();
const {get_user, get_user_todo, get_user_id, get_user_mail, delete_user_id, update_user} = require('./user.query');
const auth_verify = require("../../middleware/auth");

router.get("/user", auth_verify, (req, res) => {
    get_user(req, res);
})

router.get("/user/todos", auth_verify, (req, res) => {
    get_user_todo(req, res);
})

router.get("/user/:value", auth_verify, (req, res) => {
    if (req.params["value"].includes("@"))
            get_user_mail(req, res);
        else
            get_user_id(req, res);
})

router.put("/user/:id", auth_verify, (req, res) => {
        update_user(req, res);
})

router.delete("/user/:id", auth_verify, (req, res) => {
    delete_user_id(req, res);
})

module.exports = router;