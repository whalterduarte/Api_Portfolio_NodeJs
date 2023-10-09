import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../service/db'
import { timeStamp } from 'console'

export interface UserType extends Model{
  id: number,
  name: string,
  sobrenome: string
}

export const Usuarios = sequelize.define<UserType>('Usuarios', {
  id:{
    type: DataTypes.NUMBER.UNSIGNED,
    autoIncrement: true,
    primaryKey:true
  },
  name:{
    type:DataTypes.STRING
  },
  sobrenome:{
    type:DataTypes.STRING
  }
},{
  tableName:'usuarios',
  timestamps: false
})