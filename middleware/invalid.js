module.exports = {
    inValid : (req, res, next) => {
        res.status(404).send({
            message : "404 access", status : 404
        })
    }
}