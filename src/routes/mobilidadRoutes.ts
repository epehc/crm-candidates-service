import express from 'express';
import { body, param } from 'express-validator';
import {
  getAllMobilidades,
  getMobilidadByCandidatoId,
  createMobilidad,
  updateMobilidad,
  deleteMobilidad
} from '../controllers/mobilidadController';

const router = express.Router();

router.get('/', getAllMobilidades);
router.get('/:id', param('id').isUUID(), getMobilidadByCandidatoId);
router.post(
  '/',
  [
    body('id').isUUID(),
    body('candidato_id').isUUID(),
    body('disponibilidad').isString(),
    body('vehiculo').isString(),
  ],
  createMobilidad
);
router.put(
  '/:id',
  [
    param('id').isUUID(),
    body('disponibilidad').optional().isString(),
    body('vehiculo').optional().isString(),
  ],
  updateMobilidad
);
router.delete('/:id', param('id').isUUID(), deleteMobilidad);

export default router;