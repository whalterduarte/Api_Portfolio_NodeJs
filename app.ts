import express, {Request, Response}  from "express"
import homeRoutes from './src/routes/homeRoutes'
import bodyParser from 'body-parser'
import path from 'path'
const exphbs = require('express-handlebars')
require('dotenv').config()
const app = express()
const port = process.env.PORT



 //Body Parser
 app.use(bodyParser.urlencoded({extended: false}))
 app.use(bodyParser.json())
 //Handlebars
 const handlebars = exphbs.create({ 
 partialsDir: path.join(__dirname, 'src/views/layouts/partials')})
 app.engine('handlebars', handlebars.engine )
 app.set('view engine', 'handlebars' )
 app.set('views', path.join(__dirname, 'src/views'))

 //Rotas
   //Home
 app.use('/', homeRoutes)


//Para rotas não encotradas
app.use((req: Request, res:Response)=>{
  res.status(404).send('Pagina não encontrada')
})

app.listen(port, () => console.log(`Servidor rodando na porta : ${port}!`))

