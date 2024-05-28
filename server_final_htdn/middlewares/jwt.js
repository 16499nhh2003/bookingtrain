const jwt = require('jsonwebtoken')

const generateAccessToken = (uid) => {
    return jwt.sign({_id: uid}, process.env.JWT_SECRET, {expiresIn: '15d'})
}

const generateRefreshToken = (uid) => {
    return jwt.sign({_id: uid}, process.env.JWT_SECRET, {expiresIn: '20d'})
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}