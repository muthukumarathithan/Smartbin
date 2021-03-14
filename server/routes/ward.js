const router = require('express').Router();
const handler = require('../handlers');
const auth = require('../middlewares/auth')


router.route('/')
.get(auth, handler.showWard)
.post(auth, handler.createWard)

router.route('/user')
.post(auth, handler.getUserWard)

router.route('/:id')
.get(auth, handler.getWard)
.post(auth, handler.updateWard)
.delete(auth, handler.deleteWard)

module.exports = router;


