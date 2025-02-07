import express from 'express';
import { body, param } from 'express-validator';
import {
  getAllVicios,
  getViciosByCandidatoId,
  createVicios,
  updateVicios,
  deleteVicios
} from '../controllers/viciosController';
import {authenticateJWT} from "@epehc/sharedutilities/middlewares/authMiddleware";
import {authorize} from "@epehc/sharedutilities/middlewares/authorize";
import {UserRole} from "@epehc/sharedutilities/enums/userRole";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Vicios
 *   description: API for managing vicios
 */

/**
 * @swagger
 * /vicios:
 *   get:
 *     summary: Retrieve a list of vicios
 *     tags: [Vicios]
 *     responses:
 *       200:
 *         description: A list of vicios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vicios'
 *       500:
 *         description: Failed to fetch vicios
 */
router.get('/',
    authenticateJWT,
    authorize([UserRole.Admin, UserRole.Reclutador]),
    getAllVicios);

/**
 * @swagger
 * /vicios/{candidato_id}:
 *   get:
 *     summary: Retrieve a single vicios
 *     tags: [Vicios]
 *     parameters:
 *       - in: path
 *         name: candidato_id
 *         required: true
 *         description: ID of the candidato
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single vicios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vicios'
 *       404:
 *         description: Vicios not found
 *       500:
 *         description: Failed to fetch vicios
 */
router.get('/:candidato_id', param('candidato_id').isUUID(),
    authenticateJWT,
    authorize([UserRole.Admin, UserRole.Reclutador]),
    getViciosByCandidatoId);

/**
 * @swagger
 * /vicios:
 *   post:
 *     summary: Create new vicios
 *     tags: [Vicios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vicios'
 *     responses:
 *       201:
 *         description: The vicios were successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vicios'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Failed to create vicios
 */
router.post(
  '/',
    authenticateJWT,
    authorize([UserRole.Admin]),
  [
    body('candidato_id').isUUID(),
    body('fuma').isString().notEmpty().withMessage('Fuma es requerido'),
    body('alcohol').isString().notEmpty().withMessage('Alcohol es requerido'),
    body('alcohol_frecuencia').isString().notEmpty().withMessage('Frecuencia de alcohol es requerido'),
    body('drogas').isString().notEmpty().withMessage('Drogas es requerido'),
    body('tatuajes').isString().notEmpty().withMessage('Tatuajes es requerido'),
  ],
  createVicios
);

/**
 * @swagger
 * /vicios/{candidato_id}:
 *   put:
 *     summary: Update an existing vicios
 *     tags: [Vicios]
 *     parameters:
 *       - in: path
 *         name: candidato_id
 *         required: true
 *         description: ID of the candidato
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vicios'
 *     responses:
 *       200:
 *         description: Vicios updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vicios'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Vicios not found
 *       500:
 *         description: Failed to update vicios
 */
router.put(
  '/:candidato_id',
    authenticateJWT,
    authorize([UserRole.Admin, UserRole.Reclutador]),
  [
    param('candidato_id').isUUID(),
    body('fuma').optional().isString().notEmpty().withMessage('Fuma es requerido'),
    body('alcohol').optional().isString().notEmpty().withMessage('Alcohol es requerido'),
    body('alcohol_frecuencia').optional().isString().notEmpty().withMessage('Frecuencia de alcohol es requerido'),
    body('drogas').optional().isString().notEmpty().withMessage('Drogas es requerido'),
    body('tatuajes').optional().isString().notEmpty().withMessage('Tatuajes es requerido'),
  ],
  updateVicios
);

/**
 * @swagger
 * /vicios/{candidato_id}:
 *   delete:
 *     summary: Delete an existing vicios
 *     tags: [Vicios]
 *     parameters:
 *       - in: path
 *         name: candidato_id
 *         required: true
 *         description: ID of the candidato
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vicios deleted
 *       404:
 *         description: Vicios not found
 *       500:
 *         description: Failed to delete vicios
 */
router.delete('/:candidato_id', param('candidato_id').isUUID(),
    authenticateJWT,
    authorize([UserRole.Admin]),
    deleteVicios);

export default router;