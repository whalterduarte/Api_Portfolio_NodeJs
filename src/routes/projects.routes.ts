import { Router, Request, Response } from 'express'
import * as projects from '../controller/projects.controller'
import multer, { Multer } from 'multer'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import multerS3 from 'multer-s3'

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'sa-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
})

const upload: Multer = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.BUCKET_NAME || '',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req: Request, file, cb) => {
      console.log('File Object:', file)
      let randomNamePhoto = Math.floor(Math.random() * 9999999);
      const originalname = file.originalname || 'default'
      cb(null, 'uploads/' + originalname + randomNamePhoto + Date.now() + '.jpg')
    },
  }),
  fileFilter: (req: Request, file: Express.Multer.File, cb) => {
    const allowed: string[] = ['image/jpg', 'image/jpeg', 'image/png']
    if (allowed.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type'))
    }
  }
})

const router = Router()

// Projects
router.get('/', projects.getProjects)
router.get('/:slug', projects.descProject)

router.post('/add', upload.single('photo'), projects.addProject)

export default router