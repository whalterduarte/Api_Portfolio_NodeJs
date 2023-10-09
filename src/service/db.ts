import { Sequelize } from "sequelize";
require('dotenv').config()


export const sequelize = new Sequelize (
  process.env.DB as string,
  process.env.USER as string,
  process.env.PASS as string,
  {
    dialect:'mysql',
    port: parseInt(process.env.DBPORT as string)})
    try{
      console.log('Connectado ao banco de dados')
  } catch(err){console.log('Erro ao se connectar'+ err)}

 
  