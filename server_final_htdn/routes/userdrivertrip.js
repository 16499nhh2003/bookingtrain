const router = require('express').Router()
const ctrls = require('../controllers/userdrivertrip')
const {verifyAccessToken, isAdmin, isOwner} = require('../middlewares/verifyToken');

router.post('/employees', ctrls.postOneEmployee);
router.post('/employees/company', ctrls.addOne);
router.get('/employees/company/:phoneCompany', ctrls.getlistbycompany);
router.put('/employees/company/:phoneUser', ctrls.updateOne);
router.delete('/employees/company/:phoneUser', ctrls.deleteOne);
module.exports = router
