const Sequelize = require('sequelize');
const dbConf = require('../Database/databaseConf.js');        
const DataBase = new Sequelize(`${dbConf.dialect}://${dbConf.user}:${dbConf.password}@${dbConf.host}:${dbConf.port}/${dbConf.db_name}`);

module.exports ={ 
    newParticipant: (req,res) => {
        DataBase.query(
            'INSERT INTO participants (fullname, email, participant_desc) VALUES (:fullname, :email, :participant_desc)',{
                replacements: req.body
            }).then(result => console.log(result) || res.status(200).json('New participant created'))
              .catch(error => console.log(error) || res.status(400).send('Invalid data'))
    }
}
