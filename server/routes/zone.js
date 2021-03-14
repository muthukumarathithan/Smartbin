const router = require('express').Router();
const handler = require('../handlers');
const auth = require('../middlewares/auth')


router.route('/')
.get(auth, handler.showZone)
.post(auth, handler.createZone)

router.route('/user')
.post(auth, handler.getUserZone)

router.route('/:id')
.get(auth, handler.getZone)
.post(auth, handler.updateZone)
.delete(auth, handler.deleteZone)

module.exports = router;


