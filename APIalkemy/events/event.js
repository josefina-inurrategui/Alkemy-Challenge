const Sequelize = require('sequelize');
const dbConf = require('../Database/databaseConf.js');        
const DataBase = new Sequelize(`${dbConf.dialect}://${dbConf.user}:${dbConf.password}@${dbConf.host}:${dbConf.port}/${dbConf.db_name}`);

module.exports ={
    weekEvents: async (req,res) => {
        week = req.params.week
        const weekEvents = await DataBase.query(`SELECT * FROM events WHERE week(event_date,1) = ${week}`, { type: Sequelize.QueryTypes.SELECT })
        console.log(weekEvents)
        if(weekEvents == ""){
            return res.status(400).json('No events that week.');
        }else { 
            res.status(200).json(weekEvents)
        }
    },
    monthEvents: async (req,res) =>{
            month = req.params.month
            const monthEvents = await DataBase.query(`SELECT * FROM events WHERE month(event_date) = ${month}`, { type: Sequelize.QueryTypes.SELECT })
            if(monthEvents == ""){
                return res.status(400).json('No events that month.');
            }else { 
                res.status(200).json(monthEvents)
            }
    },
    newEvent: async (req, res) =>{
        const event = await DataBase.query('INSERT INTO events (event_date, start_time, end_time) VALUES (:event_date, :start_time, :end_time)',{
                replacements: req.body
            })
        const selectEvent = await DataBase.query(`SELECT MAX(id) FROM events`, { type: Sequelize.QueryTypes.SELECT })
        const eventId = Object.values(selectEvent[0].valueOf('MAX(id)'))
        req.body.participants.forEach(async (item) => {
            const participants = await DataBase.query(`INSERT INTO assistants(id_participant, id_event) VALUES (${item.id_participant},${eventId})`)
        })
        if(!selectEvent){
            return res.status(400).json('Invalid Data');
        }else { 
            res.status(200).json('Event created.')
        }
    },
    getEvent: async (req,res) =>{
        const id = req.params.id
        const db = await DataBase.query(`SELECT * FROM events WHERE id = ${id} `, { type: Sequelize.QueryTypes.SELECT })
        if(db == ""){
            return res.status(400).json('No event selected.');
        }else { 
            res.status(200).json(db)
        }
    },
    noActiveEvents: async (req,res) => {
        const db = await DataBase.query(`SELECT * FROM events WHERE active = 0`, { type: Sequelize.QueryTypes.SELECT })
        if(db == ""){
            return res.status(400).json('No cancelled events.');
        }else { 
            res.status(200).json(db)
        }
    },
    modifyEvent: (req,res) =>  {
        DataBase.query(`UPDATE events SET event_date = '${req.body.event_date}', start_time = '${req.body.start_time}', end_time = '${req.body.end_time}' WHERE id = ${req.params.id} `,{type: Sequelize.QueryTypes.SET})
        .then(result => (console.log(result)) || res.status(200).json("Event updated."))
        .catch(error => console.log(error) || res.status(400).send('Invalid data'))
    },
    cancelEvent: (req,res) => {
        DataBase.query(`UPDATE events SET active = '${req.body.active}' WHERE id = ${req.params.id} `,{type: Sequelize.QueryTypes.SET})
        .then(result => (console.log(result)) || res.status(200).json("Event cancelled."))
        .catch(error => console.log(error) || res.status(400).send('Invalid data'))
    }


}