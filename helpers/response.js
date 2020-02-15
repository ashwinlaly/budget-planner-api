let cookieConfig = require('../config')

module.exports = {
    sendData : (res, data) => {
        if(data.length > 0) {
            res.cookie('test', 123, cookieConfig.CookieConfig).status(200).send({
                data,
                message : "data listed",
                status : 200
            })
        } else {
            res.status(202).send({
                message : "no data found",
                status : 202
            })
        }
    },
    createData : (res, data) => {
        if(data.insertedCount == 1){
            res.status(200).send({
                data : data.ops,
                message : "Created successfully",
                status : 200
            })
        } else {
            res.status(202).send({
                message : "Unable to create data",
                status : 202
            })
        }
    },
    deleteData : (res, data) => {
        if(data.deletedCount == 1){
            res.status(200).send({
                message : "Delete successfully",
                status : 200
            })
        } else {
            res.status(202).send({
                message : "Unable to delete data",
                status : 202
            })
        }
    },
    sendError : (res, {message}) => {
        res.status(404).send({
            message, status : 404
        })
    },
    fileData : (res, data) => {
        if(data === true){
            res.status(200).send({
                message : "File uploaded successfully",
                status : 200
            })
        } else {
            res.status(202).send({
                message : "File upload Failed",
                status : 400
            })
        }
    }
}