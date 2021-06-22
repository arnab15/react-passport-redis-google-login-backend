const express = require("express");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

const router = express.Router();

router.get("/profile", isAuthenticated, (req, res, next) => {
   return res.send(req.user);
});

module.exports = router;
