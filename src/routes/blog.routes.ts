import { Router } from 'express'
import * as posts from '../controller/posts.controller'

const router = Router()

router.get('/posts', posts.getAllPosts)
router.get('/posts/:name', posts.getPostsByCategory)
router.get('/posts/:name/:slug')
router.get('/posts/:name/:slug', posts.getPostInCategory)

export default router;