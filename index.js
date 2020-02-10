require('dotenv').config()
let express = require('express'),
    app = express(),
    db = require('./db'),
    Logger = require('./helpers/logger'),
    Middleware = require('./middleware/invalid')
    budgetRoute = require('./routes/budget')();

app.use(express.json())
app.use(Logger.requestLogger)
app.use(budgetRoute)
app.use("*", Middleware.inValid)

db.connect(err => {
    if(err){
        console.log("DB Connection Error")
    } else {
        app.listen(process.env.PORT, () => {
            Logger.clearRequestLogger()
            Logger.clearDBLogger()
            console.log("App started")
        })
    }
})