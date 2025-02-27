import express from 'express';
import { body, param } from 'express-validator';
import {
  getAllMobilidades,
  getMobilidadByCandidatoId,
  createMobilidad,
  updateMobilidad,
  deleteMobilidad
} from '../controllers/mobilidadController';
import {authenticateJWT} from "@epehc/sharedutilities/middlewares/authMiddleware";
import {authorize} from "@epehc/sharedutilities/middlewares/authorize";
import {UserRole} from "@epehc/sharedutilities/enums/userRole";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Mobilidades
 *   description: API for managing mobilidades
 */

/**
 * @swagger
 * /mobilidades:
 *   get:
 *     summary: Retrieve a list of mobilidades
 *     tags: [Mobilidades]
 *     responses:
 *       200:
 *         description: A list of mobilidades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mobilidad'
 *       500:
 *         description: Failed to fetch mobilidades
 */
router.get('/',
    authenticateJWT,
    authorize([UserRole.Admin, UserRole.Reclutador]),
    getAllMobilidades);

/**
 * @swagger
 * /mobilidades/{candidato_id}:
 *   get:
 *     summary: Retrieve a mobilidad by candidato_id
 *     tags: [Mobilidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the mobilidad
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A mobilidad by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mobilidad'
 *       404:
 *         description: Mobilidad not found
 *       500:
 *         description: Failed to fetch mobilidad
 */
router.get('/:candidato_id',
    authenticateJWT,
    authorize([UserRole.Admin, UserRole.Reclutador]),
    getMobilidadByCandidatoId);

/**
 * @swagger
 * /mobilidades:
 *   post:
 *     summary: Create a new mobilidad
 *     tags: [Mobilidades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Mobilidad'
 *     responses:
 *       201:
 *         description: A new mobilidad
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mobilidad'
 *       500:
 *         description: Failed to create mobilidad
 */
router.post(
  '/',
    authenticateJWT,
    authorize([UserRole.Admin]),
  [
    body('candidato_id').isUUID(),
    body('licencia').isString().notEmpty().withMessage('Licencia es requerido'),
    body('licencia_tipo').isString(),
    body('licencia_fecha_expiracion').isString(),
    body('tiempo_conduciendo').isString(),
    body('vehiculo').isString().notEmpty().withMessage('Vehiculo es requerido'),
    body('vehiculo_tipo').isString(),
    body('vehiculo_modelo').isString(),
    body('viaje_interior').isString().notEmpty().withMessage('Viaje interior es requerido'),
    body('viaje_exterior').isString().notEmpty().withMessage('Viaje exterior es requerido'),
  ],
  createMobilidad
);

/**
 * @swagger
 * /mobilidades/{candidato_id}:
 *   put:
 *     summary: Update a mobilidad
 *     tags: [Mobilidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the mobilidad
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Mobilidad'
 *     responses:
 *       200:
 *         description: Updated mobilidad
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mobilidad'
 *       500:
 *         description: Failed to update mobilidad
 */
router.put(
  '/:candidato_id',
    authenticateJWT,
    authorize([UserRole.Admin, UserRole.Reclutador]),
  [
    param('candidato_id').isUUID(),
      body('licencia').optional().isString().notEmpty().withMessage('Licencia es requerido'),
      body('licencia_tipo').optional().isString(),
      body('licencia_fecha_expiracion').optional().isString(),
      body('tiempo_conduciendo').optional().isString(),
      body('vehiculo').optional().isString().notEmpty().withMessage('Vehiculo es requerido'),
      body('vehiculo_tipo').optional().isString(),
      body('vehiculo_modelo').optional().isString(),
      body('viaje_interior').optional().isString().notEmpty().withMessage('Viaje interior es requerido'),
      body('viaje_exterior').optional().isString().notEmpty().withMessage('Viaje exterior es requerido'),
  ],
  updateMobilidad
);

/**
 * @swagger
 * /mobilidades/{candidato_id}:
 *   delete:
 *     summary: Delete a mobilidad
 *     tags: [Mobilidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the mobilidad
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted mobilidad
 *       500:
 *         description: Failed to delete mobilidad
 */
router.delete('/:candidato_id', param('candidato_id').isUUID(),
    authenticateJWT,
    authorize([UserRole.Admin]),
    deleteMobilidad);

export default router;