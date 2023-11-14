const { sequelize } = require("../database/connection");
const { DataTypes } = require("sequelize");
const { Odontologo } = require("./Odontologo");
const { Cita } = require("./Cita");

const Agenda = sequelize.define("Agenda", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hora: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Odontologo.hasMany(Agenda, {
//   foreignKey: "agendaId",
});
Agenda.belongsTo(Odontologo);

Cita.hasMany(Agenda, {
    // foreignKey: "citaId",
});
Agenda.belongsTo(Cita);


module.exports = {
  Agenda
};
