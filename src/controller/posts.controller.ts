import { Request, Response } from "express"
import prisma from "../libs/prisma"

//Get list all Posts
export const getAllPosts = async (req:Request, res:Response) =>{
  try {
    const posts = await prisma.post.findMany({ orderBy: { date: 'desc' }})
    if(posts.length === 0) {
    return res
    .status(404)
    .json({error: 'Não a nenhum post cadastrado'})
    }
    return res.json({success: true, posts})
  } catch (error) {
    console.log(error)
    return res.status(500).json({ server: 'Erro interno', error })
  }
}


//Get all posts in the category
export const getPostsByCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.params

    const category = await prisma.category.findUnique({
      where: {
        name
      }
    })

    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada' })
    }

    const posts = await prisma.post.findMany({
      where: {
        categoryId: category.id
      },
      orderBy: { date: 'desc' }
    })

    if (posts.length === 0) {
      return res.status(404).json({ error: 'Não há nenhum post cadastrado para esta categoria' })
    }

    return res.json({ success: true, posts })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ server: 'Erro interno', error })
  } finally {
    await prisma.$disconnect()
  }
}


//Get Post in category
export const getPostInCategory = async (req: Request, res: Response) => {
  try {
    const { name, slug } = req.params
    const category = await prisma.category.findUnique({
      where: {
        name: name,
      },
    })
    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada' })
    }

    const post = await prisma.post.findUnique({
      where: {
        slug: slug,
        categoryId: category.id,
      },
    })
    if (!post) {
      return res.status(404).json({ error: 'Post não encontrado nesta categoria' })
    }
    return res.json({ success: true, post })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ server: 'Erro interno', error })
  } finally {
    await prisma.$disconnect()
  }
}

export const newPost = async (req: Request, res: Response) => {
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
 //New Post
 try {
  const { title, slug, content, body, url, author, categoryId } = req.body 
  const photo: string = `${process.env.BASE}/myposts/${req.file?.filename}`
    if(!title || !slug  || !content || !body || !author || !categoryId|| !photo) {
      return res.json({Sever: 'Todos os campos são obrigatorios'})
    }else{
      await prisma.post.create({
        data: {
          title,
          slug,
          url: photo,
          content,
          body,
          author,
          categoryId: parseInt(categoryId, 10),
        },
      })
      return res.json({ success: 'Post criado com sucesso' });
    }
 } catch (error) {
  console.log('Erro ao criar post:', error)
  return res.status(500).json({ Server: 'Erro interno do servidor' })
 }

}
