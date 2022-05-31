const { log } = require('debug/src/browser');
var express = require('express');
var router = express.Router();

const mysql = require('mysql2')

/* GET users listing. */
router.get('/', function (req, res, next) {

    req.app.locals.con.connect(function (err) {
        if (err) {
            console.log(err);
        }
    })

    let sql = "SELECT * FROM offices"

    let headerHtml = "<header><h1>Classics</h1><a href='/users'>Hem</a><a href='/categories'>Produkter</a><a href='/contact'>Kontakt</a></header>"

    let officesArray = [];
    let employeesArray = [];

    req.app.locals.con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        }

        officesArray = result;

        let sqlQuery = "SELECT * FROM employees"

        req.app.locals.con.query(sqlQuery, function (err, results) {
            if (err) {
                console.log(err);
            }
            employeesArray = results;

            let officesList = headerHtml + "<div style='border: 1px solid blue;'>"
            for (let i = 0; i < officesArray.length; i++) {
                const office = officesArray[i];
                officesList += "<div style='border: 1px solid red; margin: 20px;'><h3>" + office.city + "</h3><h4>" + office.addressLine1 + " - " + office.addressLine2 + "</h4><h5>" + office.state + " - " + office.country + "</h5><h5>Employees: </h5>"

                for (let i = 0; i < employeesArray.length; i++) {
                    const e = employeesArray[i];

                    if (e.officeCode === office.officeCode) {
                        officesList += "<h6>" + e.firstName + "</h6>"
                    }
                }

                officesList += "</div>"

            }
            officesList += "</div>"

            res.send(officesList)
        })
    })
});

module.exports = router;