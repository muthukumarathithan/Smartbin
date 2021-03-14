const router = require('express').Router();
const handler = require('../handlers');
const auth = require('../middlewares/auth')


router.route('/')
.get(auth, handler.showHouse)
.post(auth, handler.createHouse)

router.route('/user')
.post(auth, handler.getUserHouse)

router.route('/:id')
.get(auth, handler.getHouse)
.post(auth, handler.updateHouse)
.delete(auth, handler.deleteHouse)

module.exports = router;


