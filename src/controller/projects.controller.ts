import { Request, Response } from "express"
import prisma from "../libs/prisma"

//Get list Projects
export const getProjects = async (req:Request, res:Response) =>{
  const projects = await prisma.project.findMany({})
  try {
  if(projects.length === 0){
    return res
    .status(404)
    .json({error: 'Não a nenhum projeto cadastrado'})
  }
   return res.json({success: true, projects})
 } catch (error) {
  console.log(error)
  return res.json({Server: 'Error interno', error})
 }
}


//Routes dynamics project
export const descProject = async (req:Request, res:Response) =>{
  const {slug} = req.params
  const project = await prisma.project.findFirst({
    where:{
      slug
    }
  })
  try {
    if (!project) {
      return res.status(404).json({status: false, Server: 'Nenhum projeto encontrado'})
    }
    return await res.json({status: true, project})

  } catch (error) {
    console.log(error)
    return res.status(404).json({Server: 'Error interno'})
  }
}

//Add new project 
export const addProject = async (req:Request, res:Response) =>{
  //Types img
  interface UploadedFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
  }
  //Accpts only image
  if(req.file){
  const file = req.file as UploadedFile
 }else{
   res.status(404).json({error: 'File not sent'})
   return
 }
  
  
    try {
      const { linkgit, descproject, url, desc, title, body, slug, linkproject } = req.body
      const photo: string = `${process.env.BASE}/myprojects/${req.file?.filename}`
        if(!linkgit || !descproject || !desc || !title || !body || !slug || !linkproject || !photo) {
          return res.json({Sever: 'Todos os campos são obrigatorios'})
        }else{
          await prisma.project.create({
            data: {
              linkgit,
              descproject,
              url: photo,
              desc,
              title,
              body,
              slug,
              linkproject,
            },
          })
          return res.json({ success: 'Projeto criado com sucesso' });
        }
    } catch (error) {
      console.log('Erro ao criar projeto:', error);
      return res.status(500).json({ Server: 'Erro interno do servidor' });
    }
}