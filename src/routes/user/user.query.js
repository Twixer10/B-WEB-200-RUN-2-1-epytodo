const env = require("dotenv");
env.config();
const jwt = require("jsonwebtoken");
const db = require("../../config/db");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const ID = require("../../middleware/auth");

exports.get_user = function (req, res) {
    db.query(
        `SELECT * FROM user`,
        function (err, result) {
            if (err || result[0] === undefined)
                res.status(404).json({
                    "msg": "Not Found"
                });
            else {
                for (let i = 0; result[i]; i++)
                    result[i].created_at = result[i].created_at.toLocaleString().replace("/", "-").replace("/", "-").replace(",", "");
                res.json(result);
            }
        }
    )
}

exports.get_user_todo = function (req, res) {
    db.query(
        `SELECT * FROM todo WHERE user_id = ?`,
        [ID.ID],
        function (err, result) {
            if (err || result === undefined)
                res.status(404).json({
                    "msg": "Not Found"
                });
            else {
                res.json(result);
            }
        }
    )
}

exports.get_user_mail = function (req, res) {
    db.query(
        `SELECT * FROM user WHERE email = ?`,
        [req.params["value"]],
        function (err, result) {
            if (err || result === undefined)
                res.status(404).json({
                    "msg": "Not found"
                });
            else {
                res.json({
                    "id": result[0].id,
                    "email": result[0].email,
                    "password": result[0].password,
                    "created_at": result[0].created_at,
                    "firstname": result[0].firstname,
                    "name": result[0].name
                });
            }
        }
    )
}

exports.get_user_id = function (req, res) {
    db.query(
        `SELECT * FROM user WHERE id = ?`,
        [req.params["value"]],
        function (err, result) {
            if (err || result === undefined)
                res.status(404).json({
                    "msg": "Not found"
                });
            else {
                res.json({
                    "id": result[0].id,
                    "email": result[0].email,
                    "password": result[0].password,
                    "created_at": result[0].created_at.toLocaleString().replace("/", "-").replace("/", "-").replace(",", ""),
                    "firstname": result[0].firstname,
                    "name": result[0].name
                });
            }
        }
    )
}

exports.delete_user_id = function (req, res) {
    db.query(
        `DELETE FROM user WHERE id = ?`, [req.params["id"]],
        function (err, result) {
            if (err)
                res.status(404).json({
                    "msg": "Not found"
                });
            else
                res.json({
                    "msg": `succesfully deleted record number: ${req.params["id"]}`
                });
        }
    )
}

exports.update_user = function (req, res) {
    if (!req.body.name || !req.body.firstname || !req.created_at || !req.body.email || !req.body.password)
        res.status(400).json({
            "msg": "bad request"
        });
    db.query(
        `UPDATE user
        SET name = ?, firstname = ?, created_at = ?, email = ?, password = ? WHERE id = ?`,
        [req.body.name, req.body.firstname, req.body.created_at, req.body.email, bcrypt.hashSync(req.body.password, salt), req.params.id],
        function (err, result) {
            if (err) {
                res.status(400).json({
                    "msg": "bad request"
                });
            } else {
                db.query(
                    `SELECT * FROM user WHERE id = ?`,
                    [req.params.id],
                    function (req, result) {
                        if (err)
                            res.status(404).json({
                                "msg": "Not Found"
                            });
                        else if (result[0] === undefined)
                            res.status(404).json({
                                "msg": "Not Found"
                            });
                        else {
                            res.json({
                                "id": result[0].id,
                                "email": result[0].email,
                                "password": result[0].password,
                                "created_at": result[0].created_at.toLocaleString().replace("/", "-").replace("/", "-").replace(",", ""),
                                "firstname": result[0].firstname,
                                "name": result[0].name
                            });
                        }
                    }
                )
            }
        }
    )
}