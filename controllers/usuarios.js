const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const usuario = require('../models/usuario');

const usuariosGet = async (req, res = response) => {
  //const { q, nombre = 'no name', apikey, page, limit } = req.query;
  const { limite = 5, desde = 0 } = req.query;

  const query = { estado: true }; //only find user with state true
  //const usuarios = await usuario.find(query).skip(Number(desde)).limit(Number(limite));
  //const total = await Usuario.countDocuments(query);

  //collection of promise
  /*Esto va a permitir que se ejecuten de manera simultanea las 2 promesas y de esta manera va a tardar menos, si alguna da error entonces no se ejecutar el */
  //destructuracion de arreglo
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //Verificar si el correo existe
  //SALTSYNC - el nivel de complejidad de la encriptacion
  const salt = bcryptjs.genSaltSync();

  //Encriptar contraseña
  //hash, encriptar en una sola via.
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar en  bd
  await usuario.save();

  res.json({
    usuario,
  });
};

const usuariosPut = async (req, res = response) => {
  const id = req.params.id;
  const { _id, password, google, ...resto } = req.body; //saco password, google, y ...resto va a contener los demas elementos excepto los que excluyo

  //TODO validar contra la base de datos.
  if (password) {
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    msg: 'put api - controlador',
    usuario,
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: 'patch api - controlador',
  });
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;

  //const usuario = await Usuario.findByIdAndDelete(id);
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json({
    usuario,
  });
};
module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
