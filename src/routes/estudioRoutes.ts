import express from 'express';
import { body, param } from 'express-validator';
import {
  getAllEstudios,
  getEstudioById,
  createEstudio,
  updateEstudio,
  deleteEstudio,
  getEstudiosByCandidatoId
} from '../controllers/estudioController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Estudios
 *   description: API for managing estudios
 */

/**
 * @swagger
 * /estudios:
 *   get:
 *     summary: Retrieve a list of estudios
 *     tags: [Estudios]
 *     responses:
 *       200:
 *         description: A list of estudios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Estudio'
 *       500:
 *         description: Failed to fetch estudios
 */
router.get('/', getAllEstudios);

/**
 * @swagger
 * /estudios/{id}:
 *   get:
 *     summary: Get a estudio by ID
 *     tags: [Estudios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The estudio ID
 *     responses:
 *       200:
 *         description: The estudio description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estudio'
 *       404:
 *         description: Estudio not found
 *       500:
 *         description: Failed to fetch estudio
 */
router.get('/:id', param('id').isUUID(), getEstudioById);

/**
 * @swagger
 * /estudios/candidato/{candidato_id}:
 *   get:
 *     summary: Get estudios by candidato ID
 *     tags: [Estudios]
 *     parameters:
 *       - in: path
 *         name: candidato_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The candidato ID
 *     responses:
 *       200:
 *         description: The estudios description by candidato ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Estudio'
 *       404:
 *         description: Estudios not found
 *       500:
 *         description: Failed to fetch estudios
 */
router.get('/candidato/:candidato_id', param('candidato_id').isUUID(), getEstudiosByCandidatoId);

/**
 * @swagger
 * /estudios:
 *   post:
 *     summary: Create a new estudio
 *     tags: [Estudios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Estudio'
 *     responses:
 *       201:
 *         description: The estudio was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estudio'
 *       500:
 *         description: Failed to create estudio
 */
router.post(
  '/',
  [
    body('id').isUUID(),
    body('candidato_id').isUUID(),
    body('institucion').isString().notEmpty().withMessage('Institucion es requerido'),
    body('titulo').isString().notEmpty().withMessage('Titulo es requerido'),
    body('grado').isString().notEmpty().withMessage('Grado es requerido'),
  ],
  createEstudio
);

/**
 * @swagger
 * /estudios/{id}:
 *   put:
 *     summary: Update a estudio
 *     tags: [Estudios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The estudio ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Estudio'
 *     responses:
 *       200:
 *         description: The estudio was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estudio'
 *       404:
 *         description: Estudio not found
 *       500:
 *         description: Failed to update estudio
 */
router.put(
  '/:id',
  [
    param('id').isUUID(),
    body('candidato_id').isUUID(),
    body('institucion').optional().isString().notEmpty().withMessage('Institucion es requerido'),
    body('titulo').optional().isString().notEmpty().withMessage('Titulo es requerido'),
    body('grado').optional().isString().notEmpty().withMessage('Grado es requerido'),
  ],
  updateEstudio
);

/**
 * @swagger
 * /estudios/{id}:
 *   delete:
 *     summary: Delete a estudio
 *     tags: [Estudios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The estudio ID
 *     responses:
 *       200:
 *         description: Estudio deleted
 *       404:
 *         description: Estudio not found
 *       500:
 *         description: Failed to delete estudio
 */
router.delete('/:id', param('id').isUUID(), deleteEstudio);

export default router;