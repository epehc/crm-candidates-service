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
      body('nombre').isString(),
      body('puesto_aplicado').isString(),
      body('como_se_entero').isString(),
      body('genero').isString(),
      body('telefono_whatsapp').isString(),
      body('telefono').isString(),
      body('correo').isEmail(),
      body('aspiracion_salarial').isString(),
    ],
    createCandidato
);
router.put(
    '/:id',
    [
      param('id').isUUID(),
      body('nombre').optional().isString(),
      body('puesto_aplicado').optional().isString(),
      body('como_se_entero').optional().isString(),
      body('genero').optional().isString(),
      body('telefono_whatsapp').optional().isString(),
      body('telefono').optional().isString(),
      body('correo').optional().isEmail(),
      body('aspiracion_salarial').optional().isString(),
    ],
    updateCandidato
);
router.delete('/:id', deleteCandidato);

export default router;