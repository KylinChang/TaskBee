var express     = require('express');
var router      = express.Router();
var get_profile = require('./get_profile');
var register    = require('./register');
var tasks       = require('./tasks');
var friends     = require('./friends');
var avatar      = require('./avatar');

router.use(get_profile);
router.use(register);
router.use(tasks);
router.use(friends);
router.use(avatar);

module.exports = router;
