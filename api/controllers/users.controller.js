import User from '../models/User.js';
import fs from 'fs-extra';
import cloudinary from 'cloudinary';
import Jwt from 'jsonwebtoken';


export const createUser = async ( req,res ) => {
  try {
    const { username, email, password } = req.body;
    const findExistUser = await User.findOne({username});
    const findExistEmail = await User.findOne({email});
    if(findExistUser || findExistEmail) return res.status(203).json({message: 'El usuario o email ya estan registrados!',status: 203})

    const newUser = new User({
      username,
      password,
      email
    })

    if(req.file){
      if(req.file.size > 10485760) return res.status(202).json({message:'Se permiten subir archivos hasta 10.4Mb', status: 202});
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        newUser.imgUrl = `${result.secure_url}`
    } else {
        newUser.imgUrl = ''
    }

    await newUser.save()
    await fs.unlink(req.file.path)


    const sendUser = await User.findOne({_id: newUser._id},{password:0})

    res.status(200).json({sendUser, status:200})
  } catch (error) {
    res.status(400).json({error,status:400})
  }
}

export const login = async ( req,res ) => {
  try {
    const { username, password } = req.body;
    console.log(username);
    const findExistUser = await User.findOne({username});
    if(!findExistUser) return res.status(404).json({message: 'Usuario inexistente',status:404});

    const foundUser = await User.findOne({username});
    const sendUser = await User.findOne({username},{password:0})

    const matchPassword = await User.comparePassword(password, foundUser.password);

    if(!matchPassword) return res.status(401).json({message: 'Contraseña incorrecta.',status: 401})
  
    const token = Jwt.sign({id: foundUser._id},process.env.SECRET_JWT,{
      expiresIn:3000
    })
    
    res.status(200).json({sendUser,token, status: 200})
  } catch (error) {
    return res.status(400).json({error}) 
  }
}

export const getUsers = async ( req,res ) => {
  try {
    const foundUsers = await User.find();
    res.status(200).json(foundUsers);
  } catch (error) {
    res.status(400).json(error);
  }
}