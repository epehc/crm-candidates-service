import express from 'express';
import { body, param } from 'express-validator';
import {
  getAllExperienciasLaborales,
  getExperienciaLaboralById,
  getExperienciasLaboralesByCandidatoId,
  createExperienciaLaboral,
  updateExperienciaLaboral,
  deleteExperienciaLaboral
} from '../controllers/experienciaLaboralController';
import {authenticateJWT} from "@epehc/sharedutilities/middlewares/authMiddleware";
import {authorize} from "@epehc/sharedutilities/middlewares/authorize";
import {UserRole} from "@epehc/sharedutilities/enums/userRole";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ExperienciasLaborales
 *   description: API for managing experiencias laborales
 */

/**
 * @swagger
 * /experiencias-laborales:
 *   get:
 *     summary: Retrieve a list of experiencias laborales
 *     tags: [ExperienciasLaborales]
 *     responses:
 *       200:
 *         description: A list of experiencias laborales
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ExperienciaLaboral'
 *       500:
 *         description: Failed to fetch experiencias laborales
 */
router.get('/',
    authenticateJWT,
    authorize([UserRole.Admin, UserRole.Reclutador]),
    getAllExperienciasLaborales);

/**
 * @swagger
 * /experiencias-laborales/{id}:
 *   get:
 *     summary: Get a experiencia laboral by ID
 *     tags: [ExperienciasLaborales]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The experiencia laboral ID
 *     responses:
 *       200:
 *         description: The experiencia laboral description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExperienciaLaboral'
 *       404:
 *         description: Experiencia laboral not found
 *       500:
 *         description: Failed to fetch experiencia laboral
 */
router.get('/:id', param('id').isUUID(),
    authenticateJWT,
    authorize([UserRole.Admin, UserRole.Reclutador]),
    getExperienciaLaboralById);

/**
 * @swagger
 * /experiencias-laborales/candidato/{candidato_id}:
 *   get:
 *     summary: Get experiencias laborales by candidato ID
 *     tags: [ExperienciasLaborales]
 *     parameters:
 *       - in: path
 *         name: candidato_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The candidato ID
 *     responses:
 *       200:
 *         description: The experiencias laborales description by candidato ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ExperienciaLaboral'
 *       404:
 *         description: Experiencias laborales not found
 *       500:
 *         description: Failed to fetch experiencias laborales
 */
router.get('/candidato/:candidato_id',
    authenticateJWT,
    authorize([UserRole.Admin, UserRole.Reclutador]),
    getExperienciasLaboralesByCandidatoId);

/**
 * @swagger
 * /experiencias-laborales:
 *   post:
 *     summary: Create a new experiencia laboral
 *     tags: [ExperienciasLaborales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExperienciaLaboral'
 *     responses:
 *       201:
 *         description: The experiencia laboral was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExperienciaLaboral'
 *       500:
 *         description: Failed to create experiencia laboral
 */
router.post(
  '/',
    authenticateJWT,
    authorize([UserRole.Admin]),
  [
    body('id').isUUID(),
    body('candidato_id').isUUID(),
    body('empresa').isString().notEmpty().withMessage('Empresa es requerido'),
    body('puesto').isString().notEmpty().withMessage('Puesto es requerido'),
    body('fecha_inicio').isString().notEmpty().withMessage('Fecha de inicio es requerido'),
    body('fecha_fin').isString().notEmpty().withMessage('Fecha de fin es requerido'),
    body('telefono_empresa').isString(),
    body('direccion_empresa').isString(),
    body('jefe_nombre').isString(),
    body('jefe_telefono').isString(),
    body('motivo_salida').isString(),
    body('responsabilidades').isString(),
    body('salario').isString(),
  ],
  createExperienciaLaboral
);

/**
 * @swagger
 * /experiencias-laborales/{id}:
 *   put:
 *     summary: Update a experiencia laboral
 *     tags: [ExperienciasLaborales]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The experiencia laboral ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExperienciaLaboral'
 *     responses:
 *       200:
 *         description: The experiencia laboral was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExperienciaLaboral'
 *       500:
 *         description: Failed to update experiencia laboral
 */
router.put(
  '/:id',
    authenticateJWT,
    authorize([UserRole.Admin, UserRole.Reclutador]),
  [
    param('id').isUUID(),
    body('candidato_id').isUUID(),
    body('empresa').optional().isString().notEmpty().withMessage('Empresa es requerido'),
    body('puesto').optional().isString().notEmpty().withMessage('Puesto es requerido'),
    body('fecha_inicio').optional().isString().notEmpty().withMessage('Fecha de inicio es requerido'),
    body('fecha_fin').optional().isString().notEmpty().withMessage('Fecha de fin es requerido'),
    body('telefono_empresa').optional().isString(),
    body('direccion_empresa').optional().isString(),
    body('jefe_nombre').optional().isString(),
    body('jefe_telefono').optional().isString(),
    body('motivo_salida').optional().isString(),
    body('responsabilidades').optional().isString(),
    body('salario').optional().isString(),
  ],
  updateExperienciaLaboral
);

/**
 * @swagger
 * /experiencias-laborales/{id}:
 *   delete:
 *     summary: Delete a experiencia laboral
 *     tags: [ExperienciasLaborales]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The experiencia laboral ID
 *     responses:
 *       200:
 *         description: The experiencia laboral was successfully deleted
 *       500:
 *         description: Failed to delete experiencia laboral
 */
router.delete('/:id', param('id').isUUID(),
    authenticateJWT,
    authorize([UserRole.Admin]),
    deleteExperienciaLaboral);

export default router;