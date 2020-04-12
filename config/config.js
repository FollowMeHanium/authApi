require('dotenv').config();
const env = process.env

const development ={
    "username": "root",
    "password": env.DB_PASSWORD,
    "database": "comeon_db",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
};
const test = {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
};

const production = {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
};

module.exports={development,production,test};