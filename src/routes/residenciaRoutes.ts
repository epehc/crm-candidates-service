import express from 'express';
import { body, param } from 'express-validator';
import {
  getAllResidencias,
  getResidenciaByCandidatoId,
  createResidencia,
  updateResidencia,
  deleteResidencia
} from '../controllers/residenciaController';

const router = express.Router();

router.get('/', getAllResidencias);
router.get('/:id', param('id').isUUID(), getResidenciaByCandidatoId);
router.post(
  '/',
  [
    body('residencia_id').isUUID(),
    body('candidato_id').isUUID(),
    body('direccion').isString(),
    body('ciudad').isString(),
    body('pais').isString(),
  ],
  createResidencia
);
router.put(
  '/:id',
  [
    param('id').isUUID(),
    body('direccion').optional().isString(),
    body('ciudad').optional().isString(),
    body('pais').optional().isString(),
  ],
  updateResidencia
);
router.delete('/:id', param('id').isUUID(), deleteResidencia);

export default router;