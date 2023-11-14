const { sequelize } = require('../database/connection');
const { DataTypes } = require('sequelize');
const { User } = require('./User');

const Paciente = sequelize.define('Paciente', {
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

User.hasMany(Paciente, {
    // foreignKey: 'userId'
});

Paciente.belongsTo(User);

module.exports = {
    Paciente
}
