const router = require('express').Router()
const ctrls = require('../controllers/voucher')
const { verifyAccessToken, isAdmin, isOwner } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken], ctrls.createVoucher);
router.get('/:vId', [verifyAccessToken], ctrls.getVoucher);
router.get('/', [verifyAccessToken, isAdmin || isOwner], ctrls.getAllVoucher);
router.put('/:vId', [verifyAccessToken, isAdmin || isOwner], ctrls.updateVoucher);
router.delete('/:vId', [verifyAccessToken], ctrls.deleteVoucher);

module.exports = router
