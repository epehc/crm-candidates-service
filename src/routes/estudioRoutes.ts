import express from 'express';
import { body, param } from 'express-validator';
import {
  getAllEstudios,
  getEstudioById,
  createEstudio,
  updateEstudio,
  deleteEstudio,
  getEstudiosByCandidatoId
} from '../controllers/estudioController';

const router = express.Router();

router.get('/', getAllEstudios);
router.get('/:id', param('id').isUUID(), getEstudioById);
router.get('/candidato/:candidato_id', param('candidato_id').isUUID(), getEstudiosByCandidatoId);
router.post(
  '/',
  [
    body('id').isUUID(),
    body('candidato_id').isUUID(),
    body('institucion').isString().notEmpty().withMessage('Institucion es requerido'),
    body('titulo').isString().notEmpty().withMessage('Titulo es requerido'),
    body('grado').isString().notEmpty().withMessage('Grado es requerido'),
  ],
  createEstudio
);
router.put(
  '/:id',
  [
    param('id').isUUID(),
    body('candidato_id').isUUID(),
    body('institucion').optional().isString().notEmpty().withMessage('Institucion es requerido'),
    body('titulo').optional().isString().notEmpty().withMessage('Titulo es requerido'),
    body('grado').optional().isString().notEmpty().withMessage('Grado es requerido'),
  ],
  updateEstudio
);
router.delete('/:id', param('id').isUUID(), deleteEstudio);

export default router;