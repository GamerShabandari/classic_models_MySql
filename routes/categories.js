const { log } = require('debug/src/browser');
var express = require('express');
var router = express.Router();


const mysql = require('mysql2')


router.get('/', function (req, res, next) {

    req.app.locals.con.connect(function (err) {
        if (err) {
            console.log(err);
        }

        let sql = "SELECT * FROM productlines"

        let headerHtml = "<header><h1>Classics</h1><a href='/users'>Hem</a><a href='/categories'>Produkter</a><a href='/contact'>Kontakt</a></header>"

        req.app.locals.con.query(sql, function (err, result) {
            if (err) {
                console.log(err);
            }
            console.log(result);

            let productsList = headerHtml + "<div><ul>";

            for (let i = 0; i < result.length; i++) {
                const product = result[i];

                productsList += "<li><a href='/products/"+ product.productLine  +"'>" + product.productLine + "</a></li>"

            }
            
            productsList += "</ul></div>"

            res.send(productsList)

        })
    })
});

module.exports = router;
