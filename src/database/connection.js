const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'isaias_ced_clinica', // db name
    'isaias_rene',    // user name
    'Rene.1515',    //password
    {
        host: 'postgresql-isaias.alwaysdata.net',
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        },
        logging: false
    }
)

module.exports = {
    sequelize
}