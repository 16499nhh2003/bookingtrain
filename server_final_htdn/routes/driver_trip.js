const router = require('express').Router()
const ctrls = require('../controllers/driver_trip')
const {verifyAccessToken, isAdmin, isOwner} = require('../middlewares/verifyToken')

router.get('/employees', ctrls.getDriverByCompany)
router.get('/', ctrls.getAllDriverTrip)
router.post('/', ctrls.createDriverTrip);
router.get('/listbydategrate', ctrls.getlistDriverTripAfterDate)
router.put('/:id', ctrls.updateDriverTrip);
router.get('/listbydate', ctrls.getlistByDATE)
router.get('/listbytrip', ctrls.getlistByIDTRIP)
router.get('/listbytripanddate', ctrls.getlistByIDTRIPandDATE)
router.get('/listbyIDTRIPandAfterDate', ctrls.getlistDriverTripAfterDateANDTRIP)
router.get('/info/:id', ctrls.getOne)
router.get('/search' , ctrls.getListDriverTripStartAnnEndAndDate)

module.exports = router
