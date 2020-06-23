const server = require('express')();
const bodyParserJson = require('body-parser').json();

const {newEvent, weekEvents, monthEvents} = require('./events/event.js')

server.listen(3000,()=> console.log('servidor iniciado...'))
server.use(bodyParserJson)
server.use(function(err, req, res, next) {
    if(!err) return next();
    console.log('Error, something went wrong', err);
    res.status(500).send('Error');
});

//----- Events ----
server.get('/events/week/:week', weekEvents)
server.get('/events/month/:month', monthEvents)
/* server.get('/events/:id', getEvent)
server.get('/events', noActiveEvents) */
server.post('/events', newEvent)
/* server.put('/events/:id', modifyEvent)
server.delete('/events/:id', cancelEvent)

//----- Assistance ----
server.get('/assistance/:id', getAssistance)
server.put('/assistance/:id', changeAssistance)

//----- Participants ----
server.post('/participants', newParticipant) */