import express from 'express';
import { body, param } from 'express-validator';
import {
  getAllResidencias,
  getResidenciaByCandidatoId,
  createResidencia,
  updateResidencia,
  deleteResidencia
} from '../controllers/residenciaController';
import {authenticateJWT} from "@epehc/sharedutilities/middlewares/authMiddleware";
import {authorize} from "@epehc/sharedutilities/middlewares/authorize";
import {UserRole} from "@epehc/sharedutilities/enums/userRole";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Residencias
 *   description: API for managing residencias
 */

/**
 * @swagger
 * /residencias:
 *   get:
 *     summary: Retrieve a list of residencias
 *     tags: [Residencias]
 *     responses:
 *       200:
 *         description: A list of residencias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Residencia'
 *       500:
 *         description: Failed to fetch residencias
 */
router.get('/',
    authenticateJWT,
    authorize([UserRole.Admin, UserRole.Reclutador]),
    getAllResidencias);

/**
 * @swagger
 * /residencias/{candidato_id}:
 *   get:
 *     summary: Retrieve a residencia by its candidato_id
 *     tags: [Residencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of residencia
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A residencia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Residencia'
 *       404:
 *         description: Residencia not found
 *       500:
 *         description: Failed to fetch residencia
 */
router.get('/:candidato_id',
    authenticateJWT,
    authorize([UserRole.Admin, UserRole.Reclutador]),
    getResidenciaByCandidatoId);

/**
 * @swagger
 * /residencias:
 *   post:
 *     summary: Create a new residencia
 *     tags: [Residencias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Residencia'
 *     responses:
 *       201:
 *         description: Residencia created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Residencia'
 *       500:
 *         description: Failed to create residencia
 */
router.post(
  '/',
    authenticateJWT,
    authorize([UserRole.Admin]),
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

/**
 * @swagger
 * /residencias/{candidato_id}:
 *   put:
 *     summary: Update a residencia
 *     tags: [Residencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of residencia
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Residencia'
 *     responses:
 *       200:
 *         description: Residencia updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Residencia'
 *       500:
 *         description: Failed to update residencia
 */
router.put(
  '/:candidato_id',
    authenticateJWT,
    authorize([UserRole.Admin, UserRole.Reclutador]),
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

/**
 * @swagger
 * /residencias/{candidato_id}:
 *   delete:
 *     summary: Delete a residencia
 *     tags: [Residencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of residencia
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Residencia deleted
 *       500:
 *         description: Failed to delete residencia
 */
router.delete('/:candidato_id', param('candidato_id').isUUID(),
    authenticateJWT,
    authorize([UserRole.Admin]),
    deleteResidencia);

export default router;