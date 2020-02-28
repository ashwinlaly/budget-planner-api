let moment = require('moment'),
    jwt = require('jsonwebtoken');

module.exports = {
    getCurrentStamp : () => {
        return moment().format('MMMM Do YYYY, h:mm:ss a')
    },
    generateToken : (data, expires = {expiresIn : 1}) => {
        return jwt.sign({data}, process.env.JWT_TOKEN, expires)
    },
    checkvalidToken : (token) => {
        return jwt.verify(token, process.env.JWT_TOKEN, (err, decode) => {
            return true
        })
    }
}