const router = require('express').Router()
const ctrls = require('../controllers/trip')
const {verifyAccessToken, isAdmin, isOwner} = require('../middlewares/verifyToken')

router.post('/', ctrls.createTrip);
router.get('/detail/:tId', ctrls.getTrip);
router.get('/all', ctrls.getAllTrip);
router.put('/:tId', ctrls.updateTrip);
router.delete('/:tId', ctrls.deleteTrip);
// router.get('/company/:idCompany' , ctrls.get_Trip_bycompany)
router.get('/company', ctrls.getListPHONECOMPANY)

module.exports = router
