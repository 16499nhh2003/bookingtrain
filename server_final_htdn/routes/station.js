const router = require('express').Router()
const ctrls = require('../controllers/station')
const { verifyAccessToken, isAdmin, isOwner } = require('../middlewares/verifyToken')

router.post('/', ctrls.createStation);
router.get('/', ctrls.getAllStations);
router.patch('/:id', ctrls.updateStationById);
router.delete('/:id', ctrls.deleteSeats);

module.exports = router
