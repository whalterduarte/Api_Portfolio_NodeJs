import { Request, Response } from "express"
import prisma from "../libs/prisma"
import { user } from "../types/user"
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
import { config } from "dotenv"

export const newUser = async (req:Request, res:Response)=>{
  const {email,name, password} : user = await req.body
  if(!email || !password || !name) {

    return res.status(404).json({error: 'Preencha os campos'})
  }
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })
    if(existingUser) {
      return res.json({Server: 'Usuario ja cadastrado'})
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await prisma.user.create({
      data:{
        name,
        email,
        password : hashedPassword
      }
    })
    const jwtKey: string = process.env.JWT_KEY || 'whalter'
    const token = JWT.sign(
    { userId: newUser.id, email, name },
              jwtKey,
    { expiresIn: '2h' })

    res.json({success: true, userId: newUser.id, name, email, token})

  } catch (error) {
    console.log(error)
    res.json({error, Server: 'Error interno'})
  }
  
}
