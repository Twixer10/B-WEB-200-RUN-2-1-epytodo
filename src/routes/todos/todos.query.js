const env = require("dotenv")
const db = require("../../config/db");

exports.get_todo = function (req, res) {
    db.query(
        `SELECT * FROM todo`,
        function (err, result) {
            if (err || result[0] === undefined)
                res.status(404).json({
                    "msg": "Not found"
                });
            else {
                res.json(result);
            }
        }
    )
}

exports.get_todo_id = function (req, res) {
    db.query(
        `SELECT * FROM todo WHERE id = ?`, [req.params.id],
        function (err, result) {
            if (err || result[0] === undefined)
                res.status(404).json({
                    "msg": "Not found"
                });
            else {
                result[0].created_at = result[0].created_at.toLocaleString().replace("/", "-").replace("/", "-").replace(",", "");
                res.json(result[0]);
            }
        }
    )
}

exports.add_todo = function (req, res) {
    if (!req.body.title && !req.body.description && !req.body.due_time && !req.body.user_id && !req.body.status)
        res.status(400).json({
            "msg": "bad request"
        });
    else {
        db.query(
            `INSERT INTO todo (id, title, description, created_at, due_time, user_id, status) VALUES (NULL, ?, ?, NULL, ?, ?, ?)`,
        [req.body.title, req.body.description, req.body.due_time, req.body.user_id, req.body.status],
            function (err, result) {
                if (err) {
                    res.status(400).json({
                        "msg": "bad request"
                    });
                } else {
                    res.json({
                        "title": req.body.title,
                        "description": req.body.description,
                        "due_time": req.body.due_time,
                        "user_id": req.body.user_id,
                        "status": req.body.status
                    })
                }
            }
        )
    }
}

exports.update_todo = function (req, res) {
    if (!req.body.title && !req.body.description && !req.body.due_time && !req.body.user_id && !req.body.status)
        res.status(400).json({"msg": "bad request"});
    else {
        db.query(
            `UPDATE todo
             SET title = ?, description = ?, due_time = ?, user_id = ?, status = ? WHERE id = ?`,
            [req.body.title, req.body.description, req.body.due_time, req.body.user_id, req.body.status, req.params.id],
            function (err, result) {
                if (err)
                    res.status(400).json({"msg": "bad request"});
                else {
                    res.json({
                        "title": req.body.title,
                        "description": req.body.description,
                        "due_time": req.body.due_time,
                        "user_id": req.body.user_id,
                        "status": req.body.status
                    })
                }
            }
        )
    }
}

exports.delete_todo = function (req, res) {
    db.query(
        `DELETE FROM todo WHERE id = ?`, [req.params.id],
        function (err, result) {
            if (err)
                res.status(400).json({"msg": "bad request"});
            else
                res.json({"msg": `succesfully deleted record number: ${req.params["id"]}`});
        }
    )
}