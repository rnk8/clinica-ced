const { request, response } = require("express");
const shortid = require("shortid");
const { Cita } = require("../models/Cita");
const { Agenda } = require("../models/Agenda");
const { Odontologo } = require("../models/Odontologo");
const { Paciente } = require("../models/paciente");

const crearCita = async (req, res) => {
  const { fecha, hora, nota, odontologo_id, paciente_id } = req.body;

  let odontologo = await Odontologo.findAll({
    where: { id: odontologo_id },
  });

  if (!odontologo) {
    return res
      .status(400)
      .json({ success: false, message: "odontologo no encontrado" });
  }

  let paciente = await Paciente.findAll({ where: { id: paciente_id } });
  if (!paciente) {
    return res
      .status(400)
      .json({ success: false, message: "paciente no encontrado" });
  }

  // Obtener la fecha y hora actual
  const fechaHoraActual = new Date();
  const horaActual = fechaHoraActual.toLocaleTimeString();

  const nuevoCita = Cita.build({
    id: shortid.generate(),
    fecha: fechaHoraActual.toLocaleDateString(),
    hora: horaActual,
    nota,
    PacienteId: paciente_id,
  });

  const cita = await nuevoCita.save();

  const nuevaAgenda = Agenda.build({
    id: shortid.generate(),
    fecha,
    hora,
    OdontologoId: odontologo_id,
    CitumId: cita.id,
  });

  const agenda = await nuevaAgenda.save();

  return res.json({ success: true, agenda, cita });
};

const crearPaciente = async (req, res) => {
  const { nombre, apellido, user_id } = req.body;

  const nuevoPaciente = Paciente.build({
    id: shortid.generate(),
    nombre: nombre,
    apellido: apellido,
    UserId: user_id,
  });
  const paciente = await nuevoPaciente.save();
  if (!paciente) {
    return res
      .status(400)
      .json({ success: false, message: "paciente no creado" });
  }

  return res.json({ success: true, paciente });
};

const crearOdontologo = async (req, res) => {
  const { nombre, apellido, user_id } = req.body;

  const nuevoOdontologo = Odontologo.build({
    id: shortid.generate(),
    nombre: nombre,
    apellido: apellido,
    UserId: user_id,
  });
  const odontologo = await nuevoOdontologo.save();
  if (!odontologo) {
    return res
      .status(400)
      .json({ success: false, message: "paciente no creado" });
  }

  return res.json({ success: true, odontologo });
};

const getPacientes = async (req, res) => {
  let paciente = await Paciente.findAll();

  return res.json({ success: true, paciente });
};

const getOdontologos = async (req, res) => {
  let odontologo = await Odontologo.findAll();

  return res.json({ success: true, odontologo });
};

const getCitasByPaciente = async (req, res) => {
  const { paciente_id } = req.params;
  const odonto = await Paciente.findOne({ where: { id: paciente_id } });
  if (!odonto) {
    return res
      .status(400)
      .json({ success: false, message: "paciente_id no es valido" });
  }

  let pacientes = await Cita.findAll({ where: { PacienteId: paciente_id } });
  return res.json({ success: true, pacientes });
};

const getAgendaByOdontologo = async (req, res) => {
  const { odontologo_id } = req.params;
  const odonto = await Odontologo.findOne({ where: { id: odontologo_id } });
  if (!odonto) {
    return res
      .status(400)
      .json({ success: false, message: "odontologo_id no es valido" });
  }

  let odontologos = await Agenda.findAll({
    where: { OdontologoId: odontologo_id },
  });
  return res.json({ success: true, odontologos });
};

const getCitas = async (req, res) => {
  let citas = await Cita.findAll({
    include: [
      {
        model: Paciente,
        //as: "Pacientes", // Esto debe coincidir con el alias que estableciste en la relación
      },
    ],
  });
  return res.json({ success: true, citas });
};

module.exports = {
  crearCita,
  crearPaciente,
  crearOdontologo,
  getOdontologos,
  getPacientes,
  getAgendaByOdontologo,
  getCitasByPaciente,
  getCitas,
};
