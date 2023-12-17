import express, {Request, Response}  from "express"
import login from './src/routes/login.routes'
import projects from './src/routes/projects.routes'
import blog from './src/routes/blog.routes'
import bodyParser from 'body-parser'
import path from 'path'
import cors from "cors"

require('dotenv').config()
const app = express()
const port = process.env.PORT

  // Configuração do CORS
  const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200,
}
  //Public
app.use(express.static(path.join(__dirname, './public')))

app.use(cors());

 //Body Parser
 app.use(express.json())
 app.use(bodyParser.json())

 //Rotas
   //Home
 app.use('/', login)
   //Project
 app.use('/project',projects)
   //Blog
 app.use('/blog',blog)



app.listen(port, () => console.log(`Servidor rodando na porta : ${port}!`))

