export const tieneRole = (...roles) => {
    return(req, res , next) => {
        if(!req.usuario){
            return res.status(500).json({
                succes: false,
                msg: "Se quiere verificar un role son validar el token primero"
            })
        
    }
    if(!roles.includes(req.usuario.role)){
        return res.status(401).json({
            succes: false,
            msg: `Usuario no autorizado, posee un rol ${req.usuario.role}, los roles autorizadis sib ${roles}`

        })
    }
    next();
}
}