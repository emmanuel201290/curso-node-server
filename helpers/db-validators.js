const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (rol = '') => {
  const existeRol = await Role.findOne({ rol });
  console.log(existeRol);
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la BD`);
  }
};

const emailExiste = async (correo = '') => {
  //Verificar que el correo ya existe.
  const existeEmail = await Usuario.findOne({ correo });

  if (existeEmail) {
    throw new Error(`Este correo ${correo} ya esta registrado`);
  }
};

const existeUsuarioPorId = async (id = '') => {
  //Verificar que el correo ya existe.
  const existeUsuario = await Usuario.findById(id);

  //si es null
  if (!existeUsuario) {
    throw new Error(`El id no existe ${id}`);
  }
};

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
};
