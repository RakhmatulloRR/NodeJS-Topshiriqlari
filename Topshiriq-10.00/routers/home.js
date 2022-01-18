const express = require('express');
const router = express.Router();


//& ---- get (Read root) ----
router.get("/", function(req, res) {
    res.render("index", {myTitle:"this is pug file", myH1:"Assalomu alaykum"});
});

module.exports.router = router;