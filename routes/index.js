var express = require('express');
var router = express.Router();

// Single Page entry point
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
