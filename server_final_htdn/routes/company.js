const router = require('express').Router()
const ctrls = require('../controllers/company')
const {verifyAccessToken, isAdmin, isOwner} = require('../middlewares/verifyToken')

// router.post('/', [verifyAccessToken, isOwner], ctrls.createCompany);
// router.get('/info/:cId', [verifyAccessToken], ctrls.getCompany);
// router.get('/', [verifyAccessToken, isOwner], ctrls.getAllCompany);
// router.get('/user/:idUser', [verifyAccessToken, isOwner], ctrls.getCompanyByUser);
// router.put('/:cId', [verifyAccessToken,  isOwner], ctrls.updateCompany);
// router.delete('/:cId', [verifyAccessToken, isAdmin], ctrls.deleteCompany);

router.get('/user', ctrls.getCompanyByPhoneUser)
router.post('/', ctrls.createCompany);
router.get('/listcativity/:status', ctrls.getListCompanyActivity)
router.delete('/:phone', ctrls.deleteCompany);
router.put('/:id'  , ctrls.updateCompany)


// router.get('/info/:cId', ctrls.getCompany);
// router.get('/all', ctrls.getAllCompany);
// router.get('/user/:idUser', ctrls.getCompanyByUser);
// router.put('/:cId', ctrls.updateCompany);


module.exports = router
