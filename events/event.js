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
    }



}