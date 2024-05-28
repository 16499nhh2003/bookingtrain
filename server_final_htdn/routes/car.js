const router = require('express').Router()
const ctrls = require('../controllers/car')
const { verifyAccessToken, isAdmin, isOwner } = require('../middlewares/verifyToken')
const uploadCloud = require('../config/cloudinary.config');


// router.post('/', [verifyAccessToken, uploadCloud.array('images', 5)], ctrls.createCar);
// router.get('/:cId', [verifyAccessToken], ctrls.getCar);
// router.get('/', [verifyAccessToken,], ctrls.getAllCar);
// router.put('/:cId', [verifyAccessToken,], ctrls.updateCar);
// router.delete('/:cId', [verifyAccessToken,], ctrls.deleteCar);

router.get('/company/:phoneCompany', ctrls.get_car_byIdCompany);
router.post('/',[ uploadCloud.array('images', 5)], ctrls.createCar);
router.get('/info/:cId', ctrls.getCar);
router.get('/all', ctrls.getAllCar);
router.get('/all/data', ctrls.getDataAllCar);
router.put('/:cId',  [uploadCloud.array('images', 5)], ctrls.updateCar);
router.delete('/:cId', ctrls.deleteCar);

module.exports = router
