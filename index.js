require('dotenv').config()
let express = require('express'),
    app = express(),
    db = require('./db'),
    Logger = require('./helpers/logger'),
    Middleware = require('./middleware/invalid')
    fileRoute = require('./routes/file')()
    budgetRoute = require('./routes/budget')();

app.use(express.json())
app.use(Logger.requestLogger)
app.use(budgetRoute)
app.use(fileRoute)
app.use("*", Middleware.inValid)

db.connect(() => {
    try {
        app.listen(process.env.PORT, () => {
            Logger.clearRequestLogger()
            Logger.clearDBLogger()
            console.log("App started")
        })
    } catch(err){
        console.log("DB Connection Error")
    }
})