const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const { crearCita, crearPaciente, getOdontologos, getPacientes, crearOdontologo, getAgendaByOdontologo, getCitasByPaciente, getCitas } = require('../controllers/CitaController');

router.post('/agendar_cita', [
    check('fecha', 'El campo fecha es obligatorio').not().isEmpty(),
    check('hora', 'El campo hora es obligatorio').not().isEmpty(),
    check('nota', 'El campo nota es obligatorio').not().isEmpty(),
    check('odontologo_id', 'El campo odontologo_id es obligatorio').not().isEmpty(),
    check('paciente_id', 'El campo paciente_id es obligatorio').not().isEmpty(),
    validarCampos
],crearCita);

router.post('/paciente', [
    check('nombre', 'El campo nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El campo apellido es obligatorio').not().isEmpty(),
    check('user_id', 'El campo user_id es obligatorio').not().isEmpty(),
    validarCampos
],crearPaciente);

router.post('/odontologo', [
    check('nombre', 'El campo nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El campo apellido es obligatorio').not().isEmpty(),
    check('user_id', 'El campo user_id es obligatorio').not().isEmpty(),
    validarCampos
],crearOdontologo);

router.get('/odontologo',getOdontologos);
router.get('/paciente',getPacientes);

router.get('/agendas/:odontologo_id',getAgendaByOdontologo);
router.get('/citas/:paciente_id',getCitasByPaciente);
router.get('/citas',getCitas);


module.exports = router;