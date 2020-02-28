let mongo = require('mongodb').MongoClient,
    _db;

mongo.connect('mongodb://localhost:27017/planner2', { useUnifiedTopology: true }, (err, db) => {
    _db = db;
})

module.exports = {
    _db
}