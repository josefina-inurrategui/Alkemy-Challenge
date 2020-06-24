const Sequelize = require('sequelize');
const dbConf = require('../Database/databaseConf.js');        
const DataBase = new Sequelize(`${dbConf.dialect}://${dbConf.user}:${dbConf.password}@${dbConf.host}:${dbConf.port}/${dbConf.db_name}`);