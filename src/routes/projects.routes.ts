import { Router } from 'express'
import * as projects from '../controller/projects.controller'
import multer from "multer"
import { Auth } from '../middleware/auth'
import path from 'path'

//Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const absolutePath = path.join(__dirname, '..', 'dist', 'public', 'myprojects');
    cb(null, absolutePath);
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

//Projects
router.get('/', projects.getProjects )
router.get('/:slug', projects.descProject)

router.post('/add',  upload.single('photo'), projects.addProject)

export default router;

