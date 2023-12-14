import { Router } from 'express'
import * as posts from '../controller/posts.controller'
import multer from 'multer'
import { Auth } from '../middleware/auth'

//Multer
const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, './public/myposts')
  },
  filename: (req, file, cb)=>{
    let randomNamePhoto = Math.floor(Math.random()*9999999)
    cb(null, file.fieldname+randomNamePhoto+Date.now()+'.jpg')
  }
})
const upload = multer({
  storage,
  //Filter
  fileFilter:(req, file, cb)=>{
    const allowed: string[] =  ['image/jpg','image/jpeg', 'image/png']
    if(allowed.includes(file.mimetype)){
      cb(null, true)
    }
     else{ cb(null, false)
    return
  }
    
  }
})

const router = Router()

router.get('/posts', posts.getAllPosts)
router.get('/posts/:name', posts.getPostsByCategory)
router.get('/posts/:name/:slug', posts.getPostInCategory)

router.post('/admin/newpost', upload.single('photo'), posts.newPost)

export default router;