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
    body('institucion').isString(),
    body('titulo').isString(),
    body('grado').isString(),
  ],
  createEstudio
);
router.put(
  '/:id',
  [
    param('id').isUUID(),
    body('institucion').optional().isString(),
    body('titulo').optional().isString(),
    body('grado').optional().isString(),
  ],
  updateEstudio
);
router.delete('/:id', param('id').isUUID(), deleteEstudio);

export default router;