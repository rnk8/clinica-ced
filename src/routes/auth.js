const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { login, signUp } = require('../controllers/AuthController');

router.post('/login', [
    check('email', 'El campo mail es obligatorio').isEmail(),
    check('password', 'El campo password es obligatorio').not().isEmpty(),
    validarCampos
],login);

router.post('/signup', [
    check('name', 'El campo name es obligatorio').not().isEmpty(),
    check('email', 'El campo email es obligatorio').isEmail(),
    check('password', 'El campo password es obligatorio').not().isEmpty(),
    validarCampos
], signUp);

module.exports = router;