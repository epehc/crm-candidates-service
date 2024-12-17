import express from 'express';
import { body, param } from 'express-validator';

import {
  getAllContactos,
  getContactoById,
  createContacto,
  updateContacto,
  deleteContacto,
  getContactosByCandidatoId
} from '../controllers/contactoController';

const router = express.Router();

router.get('/', getAllContactos);
router.get('/:id', getContactoById);
router.get('/candidato/:candidato_id', getContactosByCandidatoId);
router.post(
    '/',
    [
      body('id').isUUID(),
      body('candidato_id').isUUID(),
      body('parentezco').isString(),
      body('nombre').isString().notEmpty().withMessage('Nombre es requerido'),
      body('trabajo').isString().notEmpty().withMessage('Trabajo es requerido'),
      body('telefono').isString().notEmpty().withMessage('Telefono es requerido'),
    ],
    createContacto
);
router.put(
    '/:id',
    [
      param('id').isUUID(),
    body('parentezco').optional().isString(),
    body('nombre').optional().isString().notEmpty().withMessage('Nombre es requerido'),
    body('trabajo').optional().isString().notEmpty().withMessage('Trabajo es requerido'),
    body('telefono').optional().isString().notEmpty().withMessage('Telefono es requerido'),
    ],
    updateContacto
);
router.delete('/:id', deleteContacto);

export default router;