import jwt from 'jsonwebtoken';
import Usuario from '../users/user.model.js';

export const validarJWT = async (req, res, next) =>{

        const token = req.header("x-token");
    if(!token){
        return res,status(401).json ({
            msg: "no hay token en la peticion "
        })
    }
    
    try {
        const {uid} = jwt.verify(token, process.env.SECRETPRIVATEKEY);
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res.satatus(401).json({
                msg: ' usuario no existe en la base de datos'
            })
            
        } 
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido - usuarios con estado: false'
            })
            
        }
        req.usuario = usuario;
        next()
    } catch (e) {
        console.log(e),
        res.satatus(401).json({
            msg: "Token no valido "
        })
        
    }
}