import { Request, Response, NextFunction } from "express"
import prisma from "../libs/prisma"
import { config } from "dotenv"
import JWT from 'jsonwebtoken'

export const Auth ={
  private: async (req:Request, res:Response, next:NextFunction) =>{
    let success = false

    // Fazer verificação de auth
    if(req.headers.authorization) {
      const jwtKey: string = process.env.JWT_KEY as string
      const [authType, token] = req.headers.authorization.split(' ')
      if(authType === 'Bearer') {
       try {
        JWT.verify(token,jwtKey)
        success = true
       } catch (error) {}
      }
    }

    if(success) {
      next()
    }else {
      res.status(403) //Not authorized
      res.json({error: 'Não autorizado'})
  }
 }
}