let jwt = require('jsonwebtoken'),
    responseHelper = require('../helpers/response');

module.exports = function(){
    return  function(req, res, next) {
        jwt.verify(req.headers['auth'], process.env.JWT_TOKEN, (err, decode) => {
            if(err) {
                responseHelper.sendError(res, err)
            }
            next();
        })
    }
}