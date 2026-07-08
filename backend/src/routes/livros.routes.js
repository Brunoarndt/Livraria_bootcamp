import { Router } from 'express'
import * as livrosController from '../controllers/livros.controller.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const router = Router()

router.get('/', asyncHandler(livrosController.index))
router.get('/:id', asyncHandler(livrosController.show))
router.post('/', asyncHandler(livrosController.store))
router.put('/:id', asyncHandler(livrosController.update))
router.delete('/:id', asyncHandler(livrosController.destroy))

export default router