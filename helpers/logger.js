let fs = require('fs'),
    timeHelper = require('./time')

module.exports = {
    requestLogger : function(req, res, next) {
        fs.appendFile(`${process.env.APP_LOGGER}`, `${timeHelper.getCurrentStamp()} | IP -> ${req.connection.remoteAddress} | METHOD -> ${req.method} | URL -> ${req.url} \r\n`, () => {})
        next()
    },
    responseLogger : () => {

    },
    clearRequestLogger : () => {
        fs.truncate(`${process.env.APP_LOGGER}`, 0, () => {})
    },
    clearDBLogger : () => {
        fs.truncate(`${process.env.DB_LOGGER}`, 0, () => {})
    }
}