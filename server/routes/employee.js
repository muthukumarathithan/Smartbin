const router = require('express').Router();
const handler = require('../handlers');
const auth = require('../middlewares/auth')


router.route('/')
.get(auth, handler.showEmployees)
.post(auth, handler.createEmployee)

router.route('/user')
.post(auth, handler.getUserPolls)

router.route('/:id')
.get(auth, handler.getEmployee)
.post(auth, handler.updateEmployee)
.delete(auth, handler.deleteEmployee)

module.exports = router;


