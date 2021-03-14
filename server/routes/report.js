const router = require('express').Router();
const handler = require('../handlers');
const auth = require('../middlewares/auth')



router.route('/ping')
.post(auth, handler.getPing)

router.route('/distance')
.post(auth, handler.getDistance)

router.route('/history')
.post(auth, handler.getHistory)





module.exports = router;


