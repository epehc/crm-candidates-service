import express from 'express';
import { body, param } from 'express-validator';
import {
  getAllCandidatos,
  getCandidatoByEmail,
  getCandidatoByDPI,
  createCandidato,
  updateCandidato,
  deleteCandidato,
  getCandidatoByCandidatoId
} from '../controllers/candidatoController';

const router = express.Router();

router.get('/', getAllCandidatos);
router.get('/:id', getCandidatoByCandidatoId);
router.get('/email/:email', getCandidatoByEmail);
router.get('/dpi/:dpi', getCandidatoByDPI);
router.post(
    '/',
    [
      body('candidato_id').isUUID(),
      body('timestamp').isISO8601(),
      body('nombre').isString().notEmpty().withMessage('Nombre es requerido'),
      body('puesto_aplicado').isString().notEmpty().withMessage('Puesto aplicado es requerido'),
      body('como_se_entero').isString().notEmpty().withMessage('Como se entero es requerido'),
      body('genero').isString().notEmpty().withMessage('Genero es requerido'),
      body('telefono_whatsapp').isString().notEmpty().withMessage('Telefono para WhatsApp es requerido'),
      body('telefono').isString().notEmpty().withMessage('Telefono es requerido'),
      body('correo').isEmail().notEmpty().withMessage('Correo es requerido'),
      body('aspiracion_salarial').isString().notEmpty().withMessage('Aspiracion salarial es requerido'),
    ],
    createCandidato
);
router.put(
    '/:id',
    [
    param('candidato_id').isUUID(),
    body('nombre').optional().isString().notEmpty().withMessage('Nombre es requerido'),
    body('puesto_aplicado').optional().isString().notEmpty().withMessage('Puesto aplicado es requerido'),
    body('como_se_entero').optional().isString().notEmpty().withMessage('Como se entero es requerido'),
    body('genero').optional().isString().notEmpty().withMessage('Genero es requerido'),
    body('telefono_whatsapp').optional().isString().notEmpty().withMessage('Telefono para WhatsApp es requerido'),
    body('telefono').optional().isString().notEmpty().withMessage('Telefono es requerido'),
    body('correo').optional().isEmail().notEmpty().withMessage('Correo es requerido'),
    body('aspiracion_salarial').optional().isString().notEmpty().withMessage('Aspiracion salarial es requerido'),
    ],
    updateCandidato
);
router.delete('/:id', deleteCandidato);

export default router;