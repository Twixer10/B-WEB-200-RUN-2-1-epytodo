const express = require("express");
const router = express.Router();
const {get_todo, get_todo_id, add_todo, update_todo, delete_todo} = require("./todos.query");
const auth_verify = require("../../middleware/auth");

router.get("/todo", auth_verify, (req, res) => {
    get_todo(req, res);
})

router.get("/todo/:id", auth_verify, (req, res) => {
    get_todo_id(req, res);
})

router.post("/TODO", auth_verify, (req, res) => {
    add_todo(req, res);
})

router.put("/todo/:id", auth_verify, (req, res) => {
    update_todo(req, res);
})

router.delete("/todo/:id", auth_verify, (req, res) => {
    delete_todo(req, res);
})

module.exports = router;