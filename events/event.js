const Sequelize = require('sequelize');
const dbConf = require('../Database/databaseConf.js');        
const { json } = require('body-parser');
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
    newEvent: (req, res) =>{
        DataBase.query(
            'INSERT INTO events (event_date, start_time, end_time, active) VALUES (:event_date, :start_time, :end_time, :active)',{
                replacements: req.body
            }).then(result => console.log(result) || res.status(200).json('New event created'))
              .catch(error => console.log(error) || res.status(400).send('Invalid data'))
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