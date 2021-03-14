const router = require('express').Router();
const handler = require('../handlers');
const auth = require('../middlewares/auth')


router.route('/')
.get(auth, handler.showDistrict)
.post(auth, handler.createDistrict)

router.route('/user')
.post(auth, handler.getUserDistrict)

router.route('/:id')
.get(auth, handler.getDistrict)
.post(auth, handler.updateDistrict)
.delete(auth, handler.deleteDistrict)

module.exports = router;


