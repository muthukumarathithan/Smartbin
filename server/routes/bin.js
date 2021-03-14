const router = require('express').Router();
const handler = require('../handlers');
const auth = require('../middlewares/auth')


router.route('/')
.get(auth, handler.showBin)
.post(auth, handler.createBin)

router.route('/user')
.post(auth, handler.getUserBin)

router.route('/:id')
.get(auth, handler.getBin)
.post(auth, handler.updateBin)
.delete(auth, handler.deleteBin)

module.exports = router;


