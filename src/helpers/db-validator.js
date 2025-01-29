import Role from '../role/role.model.js'
import User from '../users/user.model.js'

export const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne ({ role });

    if (!existeRol) {
        throw new Error(`El role ${ role } no existe es la base de datos`);
    }
}

export const existenteEmail = async (correo = ' ') => {
    const existeEmail = await User.findOne({Correo});

    if (existeEmail) {
        throw new Error (`El correo ${ correo} ya existe en la base de datos`)
        
    }
    
}