const router = require('express').Router()
const ctrls = require('../controllers/user')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const Transaction_Model = require('../models/transaction')
const userModel = require('../models/user')

router.post('/register', ctrls.register)
router.post('/register/verify', ctrls.verifyCode)
router.post('/login', ctrls.login)
router.post('/loginphone', ctrls.loginByPhone)
router.get('/logout', ctrls.logout)
router.post('/forgotpassword', ctrls.forgotPassword)
router.put('/changepassword/:mobile', ctrls.changePassword);
router.put('/updateuser/:_id', ctrls.updateUser);


// [get] lay payment theo id ve
router.get('/payment/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        const trans = await Transaction_Model.findOne({ booking: id })
        res.status(200).json(trans)
    } catch (error) {
        next(error)
    }
})

// [get] info user by id
router.get('/phone/:phone', async (req, res, next) => {
    const { phone } = req.params
    try {
        const user = await userModel.findOne({ mobile: phone })
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
})

// [put] update user by phone
router.put('/phone/:phone', async (req, res, next) => {
    const { phone } = req.params
    const { firstname, lastname, email } = req.body
    try {
        const response = await userModel.findOneAndUpdate(
            { mobile: phone },
            { firstname, lastname, email },
            { new: true }
        )
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})


// router.get('/current', verifyAccessToken, ctrls.getCurrent)
// router.get('/', ctrls.getUsers)
// router.put('/resetpassword', ctrls.resetPassword)
// router.post('/refreshtoken', ctrls.refreshAccessToken)
module.exports = router