let express = require('express'),
    db = require('../db'),
    mongo = require('mongodb'),
    helper = require('../helpers/response'),
    budgetRoute = express.Router();

let route = () => {

    budgetRoute.get("/budgets", (req, res) => {
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
                    helper.sendData(res, data);
            })
        } catch(err){
            helper.sendError(res, err);
        }
    })

    budgetRoute.get("/budget/:id", (req, res) => {
        try{
            let _id = new mongo.ObjectID(req.params.id);
            db.Budget().find({ _id }).toArray().then(data => {
                helper.sendData(res, data);
            })
        } catch(err){
            helper.sendError(res, err);
        }
    })

    budgetRoute.post("/budget", (req, res) => {
        try{
            db.Budget().insertOne(req.body).then(data => {
                helper.createData(res, data);
            })
        } catch(err){
            helper.sendError(res, err);
        }
    })

    budgetRoute.delete("/budget/:id", (req, res) => {
        try{
            let _id = new mongo.ObjectID(req.params.id)
            db.Budget().deleteOne({ _id }).then(data => {
                helper.deleteData(res, data);
            })
        } catch(err){
            helper.sendError(res, err);
        }
    })

    return budgetRoute;
}

module.exports = route;