var express     = require('express');
var router      = express.Router();
var avatar      = require('./avatar');
var get_profile = require('./get_profile');
var register    = require('./register');
var tasks       = require('./tasks');
var friends     = require('./friends');

router.use(avatar);
router.use(get_profile);
router.use(register);
router.use(tasks);
router.use(friends);

module.exports = router;
