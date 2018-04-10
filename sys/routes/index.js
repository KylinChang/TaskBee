var express = require('express');
var router = express.Router();
var router1 = require('./router1');
var router2 = require('./router2');

router.use(router1);
router.use(router2);

module.exports = router;
