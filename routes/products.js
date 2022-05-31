const { log } = require('debug/src/browser');
var express = require('express');
var router = express.Router();

const mysql = require('mysql2')

/* GET users listing. */
router.get('/:productLine', function(req, res, next) {

    req.app.locals.con.connect(function(err){
        if (err) {
            console.log(err);
        }

        let headerHtml = "<header><h1>Classics</h1><a href='/users'>Hem</a><a href='/categories'>Produkter</a><a href='/contact'>Kontakt</a></header>"

        let sql = "SELECT * FROM products WHERE productLine IN ('"+ req.params.productLine +"')"

        req.app.locals.con.query(sql, function(err, result){
            if (err) {
                console.log(err);
            }

            let productsListHTML = headerHtml + "<div><ul>";
            for (let i = 0; i < result.length; i++) {
                const product = result[i];
                productsListHTML += "<li>"+ product.productCode + product.productName + " price: " + product.MSRP +"kr </li><br>"
            }

            productsListHTML += "</ul></div>";
            res.send(productsListHTML)
        })

    })
});

module.exports = router;
