/*Get total sum  "$date" */ 
db.budget.aggregate([
   { $unwind : "$debits" },
   { $group : { _id : null, sum : { $sum : "$debits.price" } }},
])

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

db.budget.find()