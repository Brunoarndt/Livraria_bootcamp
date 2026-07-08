import { Router } from 'express'
import * as categoriasController from '../controllers/categorias.controller.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const router = Router()

router.get('/', asyncHandler(categoriasController.index))
router.post('/', asyncHandler(categoriasController.store))

export default router
