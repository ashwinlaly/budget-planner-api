let express = require('express'),
    multer = require('multer'),
    Helper = require('../helpers/response'),
    fileRouter = express.Router();

const Upload = multer({
    // dest : 'images',
    limits : {
        fileSize : 10000
    },
    fileFilter : (req, file, cb) => {
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
            return cb(new Error('Please select an Image '))
        }
        cb(undefined, true)
    }
})

let route = () => {

    fileRouter.post('/file', Upload.single('upload'), (req, res) => {
        console.log(req.file.buffer)
        try{
            Helper.fileData(res, true)
        } catch(err){
            Helper.sendError(res, err)
        }
    }, (error, req, res, next) => {
        Helper.sendError(res, error)
    })

    return fileRouter
}

module.exports = route