import express from 'express';
import { body, param } from 'express-validator';
import {
  getAllInformacionesPersonales,
  getInformacionPersonalByCandidatoId,
  createInformacionPersonal,
  updateInformacionPersonal,
  deleteInformacionPersonal
} from '../controllers/informacionPersonalController';
import {authenticateJWT} from "@epehc/sharedutilities/middlewares/authMiddleware";
import {authorize} from "@epehc/sharedutilities/middlewares/authorize";
import {UserRole} from "@epehc/sharedutilities/enums/userRole";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: InformacionesPersonales
 *   description: API for managing informaciones personales
 */

/**
 * @swagger
 * /informaciones-personales:
 *   get:
 *     summary: Retrieve a list of informaciones personales
 *     tags: [InformacionesPersonales]
 *     responses:
 *       200:
 *         description: A list of informaciones personales
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InformacionPersonal'
 *       500:
 *         description: Failed to fetch informaciones personales
 */
router.get('/',
    authenticateJWT,
    authorize([UserRole.Admin, UserRole.Reclutador]),
    getAllInformacionesPersonales);

/**
 * @swagger
 * /informaciones-personales/{candidato_id}:
 *   get:
 *     summary: Get a informacion personal by candidato ID
 *     tags: [InformacionesPersonales]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The candidato ID
 *     responses:
 *       200:
 *         description: The informacion personal description by candidato ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InformacionPersonal'
 *       404:
 *         description: Informacion personal not found
 *       500:
 *         description: Failed to fetch informacion personal
 */
router.get('/:candidato_id',
    authenticateJWT,
    authorize([UserRole.Admin, UserRole.Reclutador]),
    getInformacionPersonalByCandidatoId);

/**
 * @swagger
 * /informaciones-personales:
 *   post:
 *     summary: Create a new informacion personal
 *     tags: [InformacionesPersonales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InformacionPersonal'
 *     responses:
 *       201:
 *         description: The informacion personal was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InformacionPersonal'
 *       500:
 *         description: Failed to create informacion personal
 */
router.post(
  '/',
    authenticateJWT,
    authorize([UserRole.Admin]),
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

/**
 * @swagger
 * /informaciones-personales/{candidato_id}:
 *   put:
 *     summary: Update a informacion personal
 *     tags: [InformacionesPersonales]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The candidato ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InformacionPersonal'
 *     responses:
 *       200:
 *         description: The informacion personal was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InformacionPersonal'
 *       500:
 *         description: Failed to update informacion personal
 */
router.put(
  '/:candidato_id',
    authenticateJWT,
    authorize([UserRole.Admin, UserRole.Reclutador]),
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

/**
 * @swagger
 * /informaciones-personales/{candidato_id}:
 *   delete:
 *     summary: Delete a informacion personal
 *     tags: [InformacionesPersonales]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The candidato ID
 *     responses:
 *       200:
 *         description: The informacion personal was successfully deleted
 *       500:
 *         description: Failed to delete informacion personal
 */
router.delete('/:candidato_id', param('candidato_id').isUUID(),
    authenticateJWT,
    authorize([UserRole.Admin]),
    deleteInformacionPersonal);

export default router;