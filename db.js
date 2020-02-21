let mongodb = require('mongodb').MongoClient
    ,Logger = require('mongodb').Logger
    ,fs = require('fs')
    ,timeHelper = require('./helpers/common')
    ,_db;

module.exports = {
    connect : cb => {
        mongodb.connect(`${process.env.DB_URL}:${process.env.DB_PORT}/`, { useUnifiedTopology: true }, (err, con) => {
            // Set debug level
            Logger.setLevel(process.env.MONGO_DEBUG)
            // Set our own logger
            Logger.setCurrentLogger(function(msg, context) {
                data = { msg, context}
                fs.appendFile(`${process.env.DB_LOGGER}`, `${timeHelper.getCurrentStamp()} - ${JSON.stringify(data)} \r\n`, () => {})
            });
            if(err) {
                throw err
            } else {
                _db = con.db(process.env.DB)
                cb()
            }
        })
    },
    get : () => {
        return _db
    },
    Budget : () => {
        return _db.collection('budget')
    }
}