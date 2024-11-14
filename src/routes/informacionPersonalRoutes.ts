import express from 'express';
import { body, param } from 'express-validator';
import {
  getAllInformacionesPersonales,
  getInformacionPersonalByCandidatoId,
  createInformacionPersonal,
  updateInformacionPersonal,
  deleteInformacionPersonal
} from '../controllers/informacionPersonalController';

const router = express.Router();

router.get('/', getAllInformacionesPersonales);
router.get('/:id', param('id').isUUID(), getInformacionPersonalByCandidatoId);
router.post(
  '/',
  [
    body('informacion_id').isUUID(),
    body('candidato_id').isUUID(),
    body('direccion').isString(),
    body('fecha_nacimiento').isString(),
    body('estado_civil').isString(),
  ],
  createInformacionPersonal
);
router.put(
  '/:id',
  [
    param('id').isUUID(),
    body('direccion').optional().isString(),
    body('fecha_nacimiento').optional().isString(),
    body('estado_civil').optional().isString(),
  ],
  updateInformacionPersonal
);
router.delete('/:id', param('id').isUUID(), deleteInformacionPersonal);

export default router;