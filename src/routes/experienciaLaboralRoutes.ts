import express from 'express';
import { body, param } from 'express-validator';
import {
  getAllExperienciasLaborales,
  getExperienciaLaboralById,
  getExperienciasLaboralesByCandidatoId,
  createExperienciaLaboral,
  updateExperienciaLaboral,
  deleteExperienciaLaboral
} from '../controllers/experienciaLaboralController';

const router = express.Router();

router.get('/', getAllExperienciasLaborales);
router.get('/:id', param('id').isUUID(), getExperienciaLaboralById);
router.get('/candidato/:candidato_id', param('candidato_id').isUUID(), getExperienciasLaboralesByCandidatoId);
router.post(
  '/',
  [
    body('id').isUUID(),
    body('candidato_id').isUUID(),
    body('empresa').isString(),
    body('puesto').isString(),
    body('fecha_inicio').isString(),
    body('fecha_fin').isString(),
    body('telefono_empresa').isString(),
    body('direccion_empresa').isString(),
    body('jefe_nombre').isString(),
    body('jefe_telefono').isString(),
    body('motivo_salida').isString(),
    body('responsabilidades').isString(),
    body('salario').isString(),
  ],
  createExperienciaLaboral
);
router.put(
  '/:id',
  [
    param('id').isUUID(),
    body('empresa').optional().isString(),
    body('puesto').optional().isString(),
    body('fecha_inicio').optional().isString(),
    body('fecha_fin').optional().isString(),
    body('telefono_empresa').optional().isString(),
    body('direccion_empresa').optional().isString(),
    body('jefe_nombre').optional().isString(),
    body('jefe_telefono').optional().isString(),
    body('motivo_salida').optional().isString(),
    body('responsabilidades').optional().isString(),
    body('salario').optional().isString(),
  ],
  updateExperienciaLaboral
);
router.delete('/:id', param('id').isUUID(), deleteExperienciaLaboral);

export default router;