import express from 'express';
import { body, param } from 'express-validator';
import {
  getAllVicios,
  getViciosByCandidatoId,
  createVicios,
  updateVicios,
  deleteVicios
} from '../controllers/viciosController';

const router = express.Router();

router.get('/', getAllVicios);
router.get('/:id', param('id').isUUID(), getViciosByCandidatoId);
router.post(
  '/',
  [
    body('candidato_id').isUUID(),
    body('fuma').isString().notEmpty().withMessage('Fuma es requerido'),
    body('alcohol').isString().notEmpty().withMessage('Alcohol es requerido'),
    body('alcohol_frecuencia').isString().notEmpty().withMessage('Frecuencia de alcohol es requerido'),
    body('drogas').isString().notEmpty().withMessage('Drogas es requerido'),
    body('tatuajes').isString().notEmpty().withMessage('Tatuajes es requerido'),
  ],
  createVicios
);
router.put(
  '/:id',
  [
    param('candidato_id').isUUID(),
    body('fuma').optional().isString().notEmpty().withMessage('Fuma es requerido'),
    body('alcohol').optional().isString().notEmpty().withMessage('Alcohol es requerido'),
    body('alcohol_frecuencia').optional().isString().notEmpty().withMessage('Frecuencia de alcohol es requerido'),
    body('drogas').optional().isString().notEmpty().withMessage('Drogas es requerido'),
    body('tatuajes').optional().isString().notEmpty().withMessage('Tatuajes es requerido'),
  ],
  updateVicios
);
router.delete('/:id', param('id').isUUID(), deleteVicios);

export default router;