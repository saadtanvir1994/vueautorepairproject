var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var cors = require('cors')
var mysql = require('mysql2')

var port = 3000

var app = express()
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))



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
app.get('/services', (req, res) => {
    const queryString = "SELECT * from services"
    getConnection().query(queryString, (err, rows, fields) => {
        // if any error occur
        if (err) {
            res.sendStatus(500)
            res.end()
            return
        }
        const rowss = rows.map((row) => {
            return { id: row.id, label: row.name , price: row.price}
        })
        res.json(rowss);
    })
})


// Get Make according to the years
app.get('/makes/', (req, res) => {
    console.log('Feting user with id:' + req.params.year)


    const year = req.params.year;
    const queryString = "SELECT * FROM make"
    getConnection().query(queryString, (err, rows, fields) => {
        if (err) {
            res.sendStatus(500)
            console.log("Error");
            res.end() // or throw err
            return
        }

        console.log("Success");
        const users = rows.map((row) => {
            return { id: row.id, label: row.name}
        })
        res.json(users);

    })
    // res.end()
})


// Get Models
app.get('/models/:year/:makename', (req, res) => {
    console.log('Feting user with id:' + req.params.year)


    const year = req.params.year;
    const modelname = req.params.makename;
    const queryString = "SELECT * FROM makeyear WHERE year = ? AND make = ?"
    getConnection().query(queryString, [year, modelname], (err, rows, fields) => {
        if (err) {
            res.sendStatus(500)
            console.log("Error");

            res.end() // or throw err
            return
        }

        console.log("Success");
        const users = rows.map((row) => {
            return { code: row.modelname , label: row.modelname}
        })
        res.json(users);

    })
    // res.end()
})




app.listen(port, function () {
    console.log('Server started on port ' + port)
})