const router = require('express').Router();
const handler = require('../handlers');
const auth = require('../middlewares/auth')


router.route('/')
.get(auth, handler.showSupervisor)
.post(auth, handler.createSupervisor)

router.route('/user')
.post(auth, handler.getUserSupervisor)

router.route('/:id')
.get(auth, handler.getSupervisor)
.post(auth, handler.updateSupervisor)
.delete(auth, handler.deleteSupervisor)

module.exports = router;


