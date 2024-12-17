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
    body('candidato_id').isUUID(),
    body('dpi').isString().notEmpty().withMessage('DPI es requerido'),
    body('nacionalidad').isString().notEmpty().withMessage('Nacionalidad es requerida'),
    body('estado_civil').isString().notEmpty().withMessage('Estado civil es requerido'),
    body('religion').isString(),
    body('software').isString().notEmpty().withMessage('Software es requerido'),
    body('partido_politico').isString().notEmpty().withMessage('Partido politico es requerido'),
    body('sindicato').isString().notEmpty().withMessage('Sindicato es requerido'),
    body('adjetivos').isString().notEmpty().withMessage('Adjetivos es requerido'),
    body('impedimento_fisico').isString(),
    body('enfermedad').isString().notEmpty().withMessage('Enfermedad es requerida'),
    body('nivel_estudios').isString().notEmpty().withMessage('Nivel de estudios es requerido'),
    body('estudios_adicionales').isString(),
    body('idiomas').isString(),
    body('personas_dependientes').isString().notEmpty().withMessage('Personas dependientes es requerido'),
    body('fecha_nacimiento').isString(),
    body('edad').isString(),
],
  createInformacionPersonal
);
router.put(
  '/:id',
  [
    param('candidato_id').isUUID(),
      body('dpi').optional().isString().notEmpty().withMessage('DPI es requerido'),
      body('nacionalidad').optional().isString().notEmpty().withMessage('Nacionalidad es requerida'),
      body('estado_civil').optional().isString().notEmpty().withMessage('Estado civil es requerido'),
      body('religion').optional().isString(),
      body('software').optional().isString().notEmpty().withMessage('Software es requerido'),
      body('partido_politico').optional().isString().notEmpty().withMessage('Partido politico es requerido'),
      body('sindicato').optional().isString().notEmpty().withMessage('Sindicato es requerido'),
      body('adjetivos').optional().isString().notEmpty().withMessage('Adjetivos es requerido'),
      body('impedimento_fisico').optional().isString(),
      body('enfermedad').optional().isString().notEmpty().withMessage('Enfermedad es requerida'),
      body('nivel_estudios').optional().isString().notEmpty().withMessage('Nivel de estudios es requerido'),
      body('estudios_adicionales').optional().isString(),
      body('idiomas').optional().isString(),
      body('personas_dependientes').optional().isString().notEmpty().withMessage('Personas dependientes es requerido'),
      body('fecha_nacimiento').optional().isString(),
      body('edad').isString().optional(),
  ],
  updateInformacionPersonal
);
router.delete('/:id', param('id').isUUID(), deleteInformacionPersonal);

export default router;