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
      body('nombre').isString(),
      body('trabajo').isString(),
      body('telefono').isString(),
    ],
    createContacto
);
router.put(
    '/:id',
    [
      param('id').isUUID(),
      body('parentezco').optional().isEmail(),
      body('nombre').optional().isString(),
      body('trabajo').optional().isString(),
      body('telefono').optional().isString(),
    ],
    updateContacto
);
router.delete('/:id', deleteContacto);

export default router;