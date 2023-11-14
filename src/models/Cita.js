const { sequelize } = require('../database/connection');
const { DataTypes } = require('sequelize');
const { Paciente } = require('./paciente');

const Cita = sequelize.define('Cita', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    fecha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hora: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nota: {
        type: DataTypes.STRING,
        allowNull: false
    },
   
});

Paciente.hasOne(Cita, {
    // foreignKey: 'pacienteId'
});

Cita.belongsTo(Paciente);

module.exports = {
    Cita
}