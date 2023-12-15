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

app.use(cors(corsOptions));

 //Body Parser
 app.use(bodyParser.urlencoded({extended: false}))
 app.use(bodyParser.json())

 //Rotas
   //Home
 app.use('/', login)
   //Project
 app.use('/project',projects)
   //Blog
 app.use('/blog',blog)

//Para rotas não encotradas
app.use((req: Request, res:Response)=>{
  res.status(404).send('Pagina não encontrada')
})


app.listen(port, () => console.log(`Servidor rodando na porta : ${port}!`))

