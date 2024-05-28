const router = require('express').Router()
const ctrls = require('../controllers/typecar')
const { verifyAccessToken, isAdmin, isOwner } = require('../middlewares/verifyToken')

// router.get('/types', [verifyAccessToken], ctrls.getAllTypeCar1);
// router.get('/type/:tcId', [verifyAccessToken], ctrls.getTypeCar);
// router.get('/types/page', [verifyAccessToken], ctrls.getAllTypeCar);
// router.post('/', [verifyAccessToken], ctrls.createTypeCar);
// router.put('/:tcId', [verifyAccessToken], ctrls.updateTypeCar);
// router.delete('/:tcId', [verifyAccessToken], ctrls.deleteTypeCar);

router.get('/types', ctrls.getAllTypeCar1);
router.get('/type/:tcId', ctrls.getTypeCar);
router.get('/types/page', ctrls.getAllTypeCar);
router.post('/', ctrls.createTypeCar);
router.put('/:tcId',  ctrls.updateTypeCar);
router.delete('/:tcId',  ctrls.deleteTypeCar);

module.exports = router
