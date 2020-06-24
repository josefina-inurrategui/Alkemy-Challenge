const server = require('express')();
const bodyParserJson = require('body-parser').json();

const {newEvent, weekEvents, monthEvents, getEvent, noActiveEvents, modifyEvent, cancelEvent} = require('./events/event.js')
/* const {getAssistance} = require('./assistance/assistance.js')*/
const {newParticipant}= require('./participants/participants.js') 
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
server.get('/event/:id', getEvent)
server.get('/events/cancelled', noActiveEvents)
server.post('/events', newEvent)
server.put('/event/:id', modifyEvent)
server.delete('/event/cancel/:id', cancelEvent)

/*//----- Assistance ----
server.get('/assistance/:id', getAssistance)
 server.put('/assistance/:id', changeAssistance)
*/
//----- Participants ----
server.post('/participants', newParticipant) 