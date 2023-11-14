const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { User } = require('../models/User');
const shortid = require('shortid');

const login = async (req, res) => {
    const { email, password } = req.body;
    //verificar que el email exista
    let user = await User.findAll({ where: { email }}) ;
    user = user[0];
    if(!user){
        return res.status(400).json({ success: false, message: 'El email no existe'});
    }
    //verificar la contraseña 

    const hash = user.password;
    const validarPassword = bcryptjs.compareSync(password, hash);
    if (!validarPassword){
        return res.status(400).json({ success: false, message: 'El password es incorrecto'});
    }

    //generar el JWT
    const id = user.id;
    const {name, image} = user;
    const token = await generarJWT(id)
    return res.json({ success: true, user: { name, email, image}, token})
}

const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    //verificar que el email sea unico
    let verifEmail = await User.findAll({ where: { email }});
    verifEmail = verifEmail[0];
    if (verifEmail){
        return res.status(401).json({ success: false, message: ' El email ya existe '});
    }

    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    const contrasena = bcryptjs.hashSync(password, salt);

    //almacenar en la db
    const id = shortid.generate();
    const user = User.build( { id, name, email, password: contrasena });
    if(!user){
        return res.status(400).json({ success: false, message: 'User no creado'});
    }
    await user.save();
    return res.json({ success: true, message: 'User created'})
}

module.exports = {
    login,
    signUp
}