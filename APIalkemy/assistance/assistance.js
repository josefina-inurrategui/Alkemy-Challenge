const Sequelize = require('sequelize');
const dbConf = require('../Database/databaseConf.js');        
const DataBase = new Sequelize(`${dbConf.dialect}://${dbConf.user}:${dbConf.password}@${dbConf.host}:${dbConf.port}/${dbConf.db_name}`);

module.exports ={
    getAssistance: async (req,res) => {
        const idevent = req.params.id
        const db = await DataBase.query(`SELECT a.*, p.fullname FROM assistants a  
        JOIN participants p ON a.id_participant = p.id WHERE id_event = ${idevent}`, { type: Sequelize.QueryTypes.SELECT })
        if(db == ""){
            return res.status(400).json('No event selected.');
        }else { 
            res.status(200).json(db)
        }
    },
    changeAssistance:(req,res) => {
        const idparticipant = req.params.id
        DataBase.query(`UPDATE assistants SET assistance = '${req.body.assistance}' WHERE id_participant = ${idparticipant}`)
        .then(result => (console.log(result)) || res.status(200).json("Assistance updated."))
        .catch(error => console.log(error) || res.status(400).send('Invalid data'))
    }   
}