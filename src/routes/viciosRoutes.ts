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
    body('vicio_id').isUUID(),
    body('candidato_id').isUUID(),
    body('tipo').isString(),
    body('frecuencia').isString(),
  ],
  createVicios
);
router.put(
  '/:id',
  [
    param('id').isUUID(),
    body('tipo').optional().isString(),
    body('frecuencia').optional().isString(),
  ],
  updateVicios
);
router.delete('/:id', param('id').isUUID(), deleteVicios);

export default router;