const server = require('express')();
const bodyParserJson = require('body-parser').json();

server.listen(3001,()=> console.log('servidor iniciado...'))
server.use(bodyParserJson)
server.use(function(err, req, res, next) {
    if(!err) return next();
    console.log('Error, something went wrong', err);
    res.status(500).send('Error');
});

//----- Events ----
server.get('/events/:week', weekEvents)
server.get('/events/:month', monthEvents)
server.get('/events/:id', getEvent)
server.get('/events', cancelledEvents)
server.post('/events', newEvent)
server.put('/events/:id', modifyEvent)
server.delete('/events/:id', cancelEvent)

//----- Assistance ----
server.get('/assistance/:id', getAssistance)
server.put('/assistance/:id', changeAssistance)

//----- Participants ----
server.post('/participants', newParticipant)