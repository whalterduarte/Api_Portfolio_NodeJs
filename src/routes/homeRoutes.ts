import { Router } from 'express'
import * as homeController from '../controller/homeController'
const router = Router()

router.get('/', homeController.home)

export default router;