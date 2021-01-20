const jwt = require('jsonwebtoken');

//===============================
//Verificar Token 
//===============================


let verificaToken = (req, res, next) => {
    let token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });
};


//===============================
//Verificar AdminRole
//===============================
let verificaAdminRole = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.role === 'ADMIN_ROLE')
        next();
    else
        return res.status(500).json({
            ok: false,
            err: {
                message: 'El Usuario no es Administrador'
            }
        });
};




module.exports = {
    verificaToken,
    verificaAdminRole
};