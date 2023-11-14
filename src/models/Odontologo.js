const { sequelize } = require('../database/connection');
const { DataTypes } = require('sequelize');
const { User } = require('./User');

const Odontologo = sequelize.define('Odontologo', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
   
});

User.hasMany(Odontologo, {
    // foreignKey: 'userId'
});

Odontologo.belongsTo(User);

module.exports = {
    Odontologo
}