import Jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const verifyToken = async ( req,res,next ) => {
    const token = req.headers['x-access-token'];
try {
    if(!token) return res.status(401).json({message:'No token provided'});

    const decode = Jwt.verify(token,process.env.SECRET_JWT)
    req.userID = decode.id;
    const user = await User.findById(req.userID,{password:0});
    if(!user) return res.status(404).json({message:'Not user found.'})

    next()
} catch (error) {
    res.status(401).json({message:'Unauthorized'})
}
  
}