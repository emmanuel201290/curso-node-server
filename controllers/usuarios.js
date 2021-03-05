const { response } = require('express');

const usuariosGet = (req, res = response) => {

    const { q, nombre = "no name", apikey, page, limit } = req.query;

    res.json({
        msg: 'Get api - controlador',
        q,
        nombre,
        page,
        limit
    });
}

const usuariosPost = (req, res = response) => {
    const body = req.body;

    res.json({
        msg: 'post api - controlador',
        body
    });

}

const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'put api - controlador',
        id
    });

}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch api - controlador'
    });

}


const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete api - controlador'
    });

}
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}