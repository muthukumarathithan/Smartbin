const router = require('express').Router();
const handler = require('../handlers');
const auth = require('../middlewares/auth')


router.route('/')
.get(auth, handler.showVehicletype)
.post(auth, handler.createVehicletype)

router.route('/user')
.post(auth, handler.getUserVehicletype)

router.route('/:id')
.get(auth, handler.getVehicletype)
.post(auth, handler.updateVehicletype)
.delete(auth, handler.deleteVehicletype)

module.exports = router;


