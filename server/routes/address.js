const router = require('express').Router();
const handler = require('../handlers');
const auth = require('../middlewares/auth')


router.route('/')
.post(auth, handler.getAddress);


module.exports = router;


