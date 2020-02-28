let express = require('express'),
    jwt = require('jsonwebtoken'),
    AuthRouter = express.Router(),
    responseHelper = require('../helpers/response')

var route = () => {

    AuthRouter.post('/signin', (req, res) => {
        name = req.body.name
        password = req.body.password
        let data = {
            name, password
        }
        jwt.sign(data, process.env.JWT_TOKEN, (err, result) => {
            if(err) {
                responseHelper.sendError(res, err)
            }
            responseHelper.sendSuccess(res, result)
        })
    })

    AuthRouter.post('/signup', (req, res) => {
        name = req.body.name
        password = req.body.password
        email = req.body.email
        let data = {
            name, password, email
        }
        // if(err) {
        //     responseHelper.sendError(res, err)
        // }
        responseHelper.sendSuccess(res, result)
    })

    return AuthRouter
}

module.exports = route;