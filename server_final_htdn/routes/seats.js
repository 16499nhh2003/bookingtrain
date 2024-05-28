const router = require('express').Router()
const ctrls = require('../controllers/seats')
const { verifyAccessToken, isAdmin, isOwner } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken, isAdmin || isOwner], ctrls.createSeats);
router.get('/:sId', [verifyAccessToken], ctrls.getSeats);
router.get('/', [verifyAccessToken, isAdmin || isOwner], ctrls.getAllSeats);
router.put('/:sId', [verifyAccessToken, isAdmin || isOwner], ctrls.updateSeats);
router.delete('/:sId', [verifyAccessToken, isAdmin || isOwner], ctrls.deleteSeats);

module.exports = router
