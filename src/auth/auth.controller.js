import bcryptjs from 'bcryptjs';
import Usuario from '../users/user.model.js'
import {generarJWT} from '../helpers/generate-jwt.js'
 
export const login = async (req , res) => {
    const {correo, password} = req.body

    try {
        const usuario = await Usuario.findOne({email})
            if (!usuario) {
                return res.status(400).json({
                    msg: "Credenciales incorrectar, Correo no existe en la dase de datos"
                });
                
            }

            if (!usuario.estado) {
                return res.satatus(400).json({
                    msg: "El usuario no existe en la base de datos"
                });
                
            }

            const validarPassword = bcryptjs.compareSync(password, usuario.password);

            if (!validarPassword) {
                return res.satatus(400).json({
                    msg:'La contrasena es incorrecta'
                });
                
            }

            
            const token = await generateJWT(usuario.id);

            res.satatus(200).json({
                msg: 'Login OK!!',
                usuario,
                token
            })

        
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Comuniquese con el administrados "
        })
        
    }

}

export const register = async(req, res ) => {
    const {nombre , correo, password, role, phone} = req.body;
    const user = new Usuario({nombre , correo , password, role, phone});

    const salt = bcryptjs.genSaltSync();
    user, password = bcryptjs.hashSync(password, salt);

    await user.save();
    res.status(200).json({
        user, 
    });
}