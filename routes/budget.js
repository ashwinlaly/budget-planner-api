let express = require('express'),
    db = require('../db'),
    mongo = require('mongodb'),
    ResponseHelper = require('../helpers/response'),
    EmailHelper = require('../helpers/email'),
    AuthMiddleware = require('../middleware/auth'),
    budgetRoute = express.Router();

let route = () => {

    budgetRoute.get("/budgets", AuthMiddleware, (req, res) => {
        try{
            let page = Number(req.query.page || 1),
                skip = Number(req.query.skip || 5),
                limit = Number(req.query.limit || 5);
            db.Budget().aggregate([
                { '$sort'     : { 'date' : 1 } },
                { '$facet'    : {
                    metadata: [ { $count: "total" }, { $addFields: { page } } ],
                    data: [ { $skip: skip }, { $limit: limit } ]
                } }
                ]).toArray().then(data => {
                    ResponseHelper.sendData(res, data);
            })
        } catch(err){
            ResponseHelper.sendError(res, err);
        }
    })

    budgetRoute.get("/budget/:id", (req, res) => {
        try{
            let _id = new mongo.ObjectID(req.params.id);
            db.Budget().find({ _id }).toArray().then(data => {
                ResponseHelper.sendData(res, data);
            })
        } catch(err){
            ResponseHelper.sendError(res, err);
        }
    })

    budgetRoute.post("/budget", (req, res) => {
        try{
            db.Budget().insertOne(req.body).then(data => {
                ResponseHelper.createData(res, data);
            })
        } catch(err){
            ResponseHelper.sendError(res, err);
        }
    })

    budgetRoute.delete("/budget/:id", (req, res) => {
        try{
            let _id = new mongo.ObjectID(req.params.id)
            db.Budget().deleteOne({ _id }).then(data => {
                ResponseHelper.deleteData(res, data);
            })
        } catch(err){
            ResponseHelper.sendError(res, err);
        }
    })

    budgetRoute.get('/mail', (req, res) => {
        EmailHelper.HelloWorldMail().then(() => {
            console.log(1)
        }).catch(() => {
            console.log(2)
        })
        ResponseHelper.sendSuccess(res);
    })

    return budgetRoute;
}

module.exports = route;