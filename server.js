const server = require('express')();
const bodyParserJson = require('body-parser').json();

server.listen(3001,()=> console.log('servidor iniciado...'))
server.use(bodyParserJson)
server.use(function(err, req, res, next) {
    if(!err) return next();
    console.log('Error, algo salio mal', err);
    res.status(500).send('Error');
});

