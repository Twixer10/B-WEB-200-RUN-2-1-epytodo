const express = require("express");
const router = express.Router();

router.all("*", (req, res) => {
    res.status(404).json({
        "msg": "Not found"
    });
})

module.exports = router;