import { Router } from 'express'
import * as autoresController from '../controllers/autores.controller.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const router = Router()

router.get('/', asyncHandler(autoresController.index))
router.post('/', asyncHandler(autoresController.store))

export default router