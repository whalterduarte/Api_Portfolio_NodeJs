import {Request, Response} from 'express'
import {Usuarios} from '../models/Usuarios'
import { sequelize } from '../service/db'
//Listar usuarios
export const home = async (req:Request, res: Response) =>{
  const usuarios = await Usuarios.findAll()
  res.render('home',{usuarios : usuarios})
  try{
    console.log('Exibindo usuarios com sucesso')
  }catch (err){console.log('erro ao listar usuarios')}
}