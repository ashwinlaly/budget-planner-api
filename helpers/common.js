let moment = require('moment')

module.exports = {
    getCurrentStamp : () => {
        return moment().format('MMMM Do YYYY, h:mm:ss a')
    }
}