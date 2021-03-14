const router = require('express').Router();
const handler = require('../handlers');
const auth = require('../middlewares/auth')


router.route('/')
.get(auth, handler.showDrivers)
.post(auth, handler.createDriver)

router.route('/user')
.post(auth, handler.getUserPolls)

router.route('/:id')
.get(auth, handler.getDriver)
.post(auth, handler.updateDriver)
.delete(auth, handler.deleteDriver)

module.exports = router;


