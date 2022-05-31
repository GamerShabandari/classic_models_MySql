var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let headerHtml = "<header><h1>Classics</h1><a href='/users'>Hem</a><a href='/categories'>Produkter</a><a href='/contact'>Kontakt</a></header><main>Welcome Home!</main>"
  res.send(headerHtml);
});

module.exports = router;
