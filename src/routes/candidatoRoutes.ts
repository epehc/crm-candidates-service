import express from 'express';
import { body, param } from 'express-validator';
import {
    createCandidato,
    updateCandidato,
    deleteCandidato,
    getCandidatoByCandidatoId, getCandidatos
} from '../controllers/candidatoController';
import { authenticateJWT } from "@epehc/sharedutilities/middlewares/authMiddleware";
import { authorize } from "@epehc/sharedutilities/middlewares/authorize";
import { UserRole } from "@epehc/sharedutilities/enums/userRole";

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Candidatos
 *   description: API for managing candidatos
 */

/**
 * @swagger
 * /candidatos:
 *   get:
 *     summary: Retrieve a list of candidatos
 *     tags: [Candidatos]
 *     responses:
 *       200:
 *         description: A list of candidatos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Candidato'
 *       500:
 *         description: Failed to fetch candidatos
 */
router.get('/',
    authenticateJWT,
    authorize([UserRole.Admin, UserRole.Reclutador]),
    getCandidatos);

/**
 * @swagger
 * /candidatos/{candidato_id}:
 *   get:
 *     summary: Get a candidato by ID
 *     tags: [Candidatos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The candidato ID
 *     responses:
 *       200:
 *         description: The candidato description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidato'
 *       404:
 *         description: Candidato not found
 *       500:
 *         description: Failed to fetch candidato
 */
router.get('/:candidato_id',
    authenticateJWT,
    authorize([UserRole.Admin, UserRole.Reclutador]),
    getCandidatoByCandidatoId);

/**
 * @swagger
 * /candidatos:
 *   post:
 *     summary: Create a new candidato
 *     tags: [Candidatos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Candidato'
 *     responses:
 *       201:
 *         description: Candidato created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidato'
 *       500:
 *         description: Failed to create candidato
 */
router.post(
    '/',
    authenticateJWT,
    authorize([UserRole.Admin]),
    [
        body('candidato_id').isUUID(),
        body('timestamp').isISO8601(),
        body('nombre').isString().notEmpty().withMessage('Nombre es requerido'),
        body('puesto_aplicado').isString().notEmpty().withMessage('Puesto aplicado es requerido'),
        body('como_se_entero').isString().notEmpty().withMessage('Como se entero es requerido'),
        body('genero').isString().notEmpty().withMessage('Genero es requerido'),
        body('telefono_whatsapp').isString().notEmpty().withMessage('Telefono para WhatsApp es requerido'),
        body('telefono').isString().notEmpty().withMessage('Telefono es requerido'),
        body('correo').isEmail().notEmpty().withMessage('Correo es requerido'),
        body('aspiracion_salarial').isString().notEmpty().withMessage('Aspiracion salarial es requerido'),
    ],
    createCandidato
);

/**
 * @swagger
 * /candidatos/{candidato_id}:
 *   put:
 *     summary: Update a candidato
 *     tags: [Candidatos]
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
 *             $ref: '#/components/schemas/Candidato'
 *     responses:
 *       200:
 *         description: Candidato updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidato'
 *       404:
 *         description: Candidato not found
 *       500:
 *         description: Failed to update candidato
 */
router.put(
    '/:candidato_id',
    authenticateJWT,
    authorize([UserRole.Admin, UserRole.Reclutador]),
    [
    param('candidato_id').isUUID(),
    body('nombre').optional().isString().notEmpty().withMessage('Nombre es requerido'),
    body('puesto_aplicado').optional().isString().notEmpty().withMessage('Puesto aplicado es requerido'),
    body('como_se_entero').optional().isString().notEmpty().withMessage('Como se entero es requerido'),
    body('genero').optional().isString().notEmpty().withMessage('Genero es requerido'),
    body('telefono_whatsapp').optional().isString().notEmpty().withMessage('Telefono para WhatsApp es requerido'),
    body('telefono').optional().isString().notEmpty().withMessage('Telefono es requerido'),
    body('correo').optional().isEmail().notEmpty().withMessage('Correo es requerido'),
    body('aspiracion_salarial').optional().isString().notEmpty().withMessage('Aspiracion salarial es requerido'),
    body('comentarios').optional().isString().notEmpty().withMessage('Aspiracion salarial es requerido'),
    ],
    updateCandidato
);

/**
 * @swagger
 * /candidatos/{candidato_id}:
 *   delete:
 *     summary: Delete a candidato
 *     tags: [Candidatos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The candidato ID
 *     responses:
 *       200:
 *         description: Candidato deleted
 *       404:
 *         description: Candidato not found
 *       500:
 *         description: Failed to delete candidato
 */
router.delete('/:candidato_id',
    authenticateJWT,
    authorize([UserRole.Admin]),
    deleteCandidato);

export default router;