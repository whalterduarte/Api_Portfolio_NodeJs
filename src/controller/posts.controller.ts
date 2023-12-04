import { Request, Response } from "express"
import prisma from "../libs/prisma"

//Get list Posts
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


//Get Category Posts
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


//Get Post in slug
export const getPostInCategory = async (req: Request, res: Response) => {
  try {
    const { name, slug } = req.params;

    const category = await prisma.category.findUnique({
      where: {
        name: name,
      },
    });

    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada' })
    }

    const post = await prisma.post.findUnique({
      where: {
        slug: slug,
        categoryId: category.id,
      },
    });

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