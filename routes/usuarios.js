const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.get('/', usuariosGet);
router.put(
  '/:id',
  [check('id', 'No es un ID valido').isMongoId(), check('id').custom(existeUsuarioPorId), validarCampos],
  usuariosPut
);
//si pasamos 2 parametros significa que el segundo parametro es el controlador
//de lo contrario , si pasamos 3 param. el segundo param. es un middleware
//el middleware check, le pasamos que campo del body queremos validar y el mensaje.
router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser mas de 6 letras').isLength({ min: 6 }),
    //check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos,
  ], //El middleware  validarCampos es el ultimo que se ejecuta y  verifica
  //si los middlewares(check anteriores) pasan entonces ejecutamos el controlador
  usuariosPost
);
router.delete(
  '/:id',
  [check('id', 'No es un ID valido').isMongoId(), check('id').custom(existeUsuarioPorId), validarCampos],
  usuariosDelete
);
router.patch('/', usuariosPatch);

module.exports = router;
