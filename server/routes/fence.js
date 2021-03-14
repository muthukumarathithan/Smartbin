const router = require('express').Router();
const handler = require('../handlers');
const auth = require('../middlewares/auth')


router.route('/')
.get(auth,handler.showFences)
.post(auth, handler.createFence)

router.route('/user')
.post(auth, handler.getUserPolls)

router.route('/get_fence_list')
.post(auth, handler.showCustomerFences)

router.route('/:id')
.get(auth, handler.getFence)
.post(auth, handler.vote)
.delete(auth, handler.deleteFence)



module.exports = router;


