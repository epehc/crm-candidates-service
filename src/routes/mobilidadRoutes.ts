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
    body('candidato_id').isUUID(),
    body('licencia').isString().notEmpty().withMessage('Licencia es requerido'),
    body('licencia_tipo').isString(),
    body('licencia_fecha_expiracion').isString(),
    body('tiempo_conduciendo').isString(),
    body('vehiculo').isString().notEmpty().withMessage('Vehiculo es requerido'),
    body('vehiculo_tipo').isString(),
    body('vehiculo_modelo').isString(),
    body('viaje_interior').isString().notEmpty().withMessage('Viaje interior es requerido'),
    body('viaje_exterior').isString().notEmpty().withMessage('Viaje exterior es requerido'),
  ],
  createMobilidad
);
router.put(
  '/:id',
  [
    param('candidato_id').isUUID(),
      body('licencia').optional().isString().notEmpty().withMessage('Licencia es requerido'),
      body('licencia_tipo').optional().isString(),
      body('licencia_fecha_expiracion').optional().isString(),
      body('tiempo_conduciendo').optional().isString(),
      body('vehiculo').optional().isString().notEmpty().withMessage('Vehiculo es requerido'),
      body('vehiculo_tipo').optional().isString(),
      body('vehiculo_modelo').optional().isString(),
      body('viaje_interior').optional().isString().notEmpty().withMessage('Viaje interior es requerido'),
      body('viaje_exterior').optional().isString().notEmpty().withMessage('Viaje exterior es requerido'),
  ],
  updateMobilidad
);
router.delete('/:id', param('id').isUUID(), deleteMobilidad);

export default router;