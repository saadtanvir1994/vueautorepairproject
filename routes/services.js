var express = require('express')
var router = express.Router()


// Database Connection
function getConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'flashdb'
    })
}
// Get All Tasks
router.get('/services', (req, res) => {
    const queryString = "SELECT name from services"
    getConnection().query(queryString, (err, rows, fields) => {
        // if any error occur
        if (err) {
            res.sendStatus(500)
            res.end() 
            return
        }
        res.json(rows);
    })
})

