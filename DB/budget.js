/*Get total sum  "$date" */ 
//db.budget.aggregate([
//   { $unwind : "$debits" },
//   { $group : { _id : null, sum : { $sum : "$debits.price" } }},
//])

/*Insert new DATA*/
//db.budget.insertOne({
//    date : "2020-01-23",
//    debits : [
//        {
//            name : "donate to grandma",
//            price : NumberDecimal(10)
//        }
//    ]
//})

/*Add new data to debits*/
//db.budget.update(
//    { date : "2020-02-12"},
//    { 
//        $push : { 
//            debits : {
//                 name : "newspaper", price : NumberDecimal(5)             
//            }
//        }
//    }
//)

/* Update a single Object field inside Array of Object  */
//db.budget.updateOne(
//    {date : "2020-02-19", "dedits.price" : NumberDecimal(10)},
//    {
//        $set : {
//            "dedits.$.price" : NumberDecimal(20)
//        }
//    }
//)

/*Delete one single debit */
//db.budget.update( 
//    { date : "2020-02-11" },
//    {
//        $pull : {
//            debits : { 
//                "name" : "newspaper"
//            }
//        }
//    }
//)

/*Paginate the data*/
//db.budget.aggregate([
//    { '$sort'     : { 'date' : 1 } },
//    { '$facet'    : {
//        metadata: [ { $count: "total" }, { $addFields: { page: NumberInt(3) } } ],
//        data: [ { $skip: 1 }, { $limit: 3 } ]
//    } }
//])

/* SUM based on type*/
//db.budget.aggregate([
//    { $unwind : "$debits" },
//    { $group : { _id : "$debits.name", total : { $sum : "$debits.price" } } }
//])
//db.budget.aggregate([
//    { $unwind : "$debits" },
//    { $group : { _id : "$date", total : { $sum : "$debits.price" } } },
//    { $sort : {_id : -1} }
//])

/*Update a field name*/
//db.budget.updateMany({}, { $rename : { "dedits" : "debits"}}) 

db.budget.find().sort({ _id : -1})
db.budget.find({date : "2020-02-19", "dedits.price" : NumberDecimal(10)})