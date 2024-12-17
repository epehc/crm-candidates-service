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
    body('candidato_id').isUUID(),
    body('vive_con').isString().notEmpty().withMessage('Vive con es requerido'),
    body('calle').isString().notEmpty().withMessage('Calle es requerido'),
    body('zona').isString().notEmpty().withMessage('Zona es requerido'),
    body('municipio').isString().notEmpty().withMessage('Municipio es requerido'),
    body('departamento').isString().notEmpty().withMessage('Departamento es requerido'),
    body('pais_de_residencia').isString().notEmpty().withMessage('Pais de residencia es requerido'),
  ],
  createResidencia
);
router.put(
  '/:id',
  [
    param('candidato_id').isUUID(),
    body('vive_con').optional().isString().notEmpty().withMessage('Vive con es requerido'),
    body('calle').optional().isString().notEmpty().withMessage('Calle es requerido'),
    body('zona').optional().isString().notEmpty().withMessage('Zona es requerido'),
    body('municipio').optional().isString().notEmpty().withMessage('Municipio es requerido'),
    body('departamento').optional().isString().notEmpty().withMessage('Departamento es requerido'),
    body('pais_de_residencia').optional().isString().notEmpty().withMessage('Pais de residencia es requerido'),
  ],
  updateResidencia
);
router.delete('/:id', param('id').isUUID(), deleteResidencia);

export default router;