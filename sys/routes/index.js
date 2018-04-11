var express     = require('express');
var router      = express.Router();
var router1     = require('./router1');
var router2     = require('./router2');
var get_profile = require('./get_profile');
var register    = require('./register');
var tasks       = require('./tasks');
var friends     = require('./friends');

router.use(router1);
router.use(router2);
router.use(get_profile);
router.use(register);
router.use(tasks);
router.use(friends);

module.exports = router;
