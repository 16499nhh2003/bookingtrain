const router = require('express').Router()
const ctrls = require('../controllers/pickup')
const {verifyAccessToken, isAdmin, isOwner} = require('../middlewares/verifyToken')


router.post('/one', ctrls.createPickUp);
router.post('/list/:idTrip', ctrls.createPickUps);
router.get('/trip/:id', ctrls.getlistPICKUP)
router.put('/:id', ctrls.updatePickUp)

// router.get('/:idTrip', ctrls.getPickUpByTrip);
module.exports = router
