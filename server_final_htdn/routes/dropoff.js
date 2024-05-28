const router = require('express').Router()
const ctrls = require('../controllers/dropoff')
const {verifyAccessToken, isAdmin, isOwner} = require('../middlewares/verifyToken')

router.post('/one', ctrls.createDropoff);
router.get('/trip/:id', ctrls.getDropoff);
router.put('/:id', ctrls.updatePickUp)

module.exports = router