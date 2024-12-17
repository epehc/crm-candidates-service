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

/**
 * @swagger
 * tags:
 *   name: Contactos
 *   description: API for managing contactos
 */

/**
 * @swagger
 * /contactos:
 *   get:
 *     summary: Retrieve a list of contactos
 *     tags: [Contactos]
 *     responses:
 *       200:
 *         description: A list of contactos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contacto'
 *       500:
 *         description: Failed to fetch contactos
 */
router.get('/', getAllContactos);

/**
 * @swagger
 * /contactos/{id}:
 *   get:
 *     summary: Get a contacto by ID
 *     tags: [Contactos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The contacto ID
 *     responses:
 *       200:
 *         description: The contacto description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contacto'
 *       404:
 *         description: Contacto not found
 *       500:
 *         description: Failed to fetch contacto
 */
router.get('/:id', getContactoById);

/**
 * @swagger
 * /contactos/candidato/{candidato_id}:
 *   get:
 *     summary: Get contactos by candidato ID
 *     tags: [Contactos]
 *     parameters:
 *       - in: path
 *         name: candidato_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The candidato ID
 *     responses:
 *       200:
 *         description: The contactos description by candidato ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contacto'
 *       404:
 *         description: Contactos not found
 *       500:
 *         description: Failed to fetch contactos
 */
router.get('/candidato/:candidato_id', getContactosByCandidatoId);

/**
 * @swagger
 * /contactos:
 *   post:
 *     summary: Create a new contacto
 *     tags: [Contactos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contacto'
 *     responses:
 *       201:
 *         description: The contacto was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contacto'
 *       500:
 *         description: Failed to create contacto
 */
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

/**
 * @swagger
 * /contactos/{id}:
 *   put:
 *     summary: Update a contacto
 *     tags: [Contactos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The contacto ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contacto'
 *     responses:
 *       200:
 *         description: The contacto was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contacto'
 *       500:
 *         description: Failed to update contacto
 */
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

/**
 * @swagger
 * /contactos/{id}:
 *   delete:
 *     summary: Delete a contacto
 *     tags: [Contactos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The contacto ID
 *     responses:
 *       200:
 *         description: The contacto was successfully deleted
 *       500:
 *         description: Failed to delete contacto
 */
router.delete('/:id', deleteContacto);

export default router;