import { Router } from 'express'
import * as list from '../controller/list.controller'
import * as login from '../controller/login.controller'
import * as register from '../controller/register.controller'
import * as projects from '../controller/projects.controller'
import { Auth } from '../middleware/auth'

const router = Router()

router.get('/users', Auth.private, list.getAllUsers )
router.post('/login', login.login)
router.post('/register', register.newUser)

//Projects
router.get('/projects', projects.getProjects )

export default router;

