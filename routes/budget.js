let express = require('express'),
    db = require('../db'),
    mongo = require('mongodb'),
    helperRes = require('../helpers/response'),
    helperEm = require('../helpers/email')
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
                    helperRes.sendData(res, data);
            })
        } catch(err){
            helperRes.sendError(res, err);
        }
    })

    budgetRoute.get("/budget/:id", (req, res) => {
        try{
            let _id = new mongo.ObjectID(req.params.id);
            db.Budget().find({ _id }).toArray().then(data => {
                helperRes.sendData(res, data);
            })
        } catch(err){
            helperRes.sendError(res, err);
        }
    })

    budgetRoute.post("/budget", (req, res) => {
        try{
            db.Budget().insertOne(req.body).then(data => {
                helperRes.createData(res, data);
            })
        } catch(err){
            helperRes.sendError(res, err);
        }
    })

    budgetRoute.delete("/budget/:id", (req, res) => {
        try{
            let _id = new mongo.ObjectID(req.params.id)
            db.Budget().deleteOne({ _id }).then(data => {
                helperRes.deleteData(res, data);
            })
        } catch(err){
            helperRes.sendError(res, err);
        }
    })

    budgetRoute.get('/mail', (req, res) => {
        helperEm.HelloWorldMail().then(() => {
            console.log(1)
        }).catch(() => {
            console.log(2)
        })
        helperRes.sendSuccess(res);
    })

    return budgetRoute;
}

module.exports = route;