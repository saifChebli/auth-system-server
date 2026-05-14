import jwt from 'jsonwebtoken'



export const generateToken = (payload) => {
    const token = jwt.sign(payload , 'super_secret_key' , {expiresIn : '1d'})
    return token
}

