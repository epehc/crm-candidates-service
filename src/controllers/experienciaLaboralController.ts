import { Request } from "@epehc/sharedutilities/types/express";
import { Response } from "express";
import ExperienciaLaboral from '../models/experienciaLaboral';
import {validationResult} from "express-validator";
import logger from "../utils/logger";

/**
 * @swagger
 * components:
 *   schemas:
 *     ExperienciaLaboral:
 *       type: object
 *       required:
 *         - id
 *         - candidato_id
 *         - empresa
 *         - puesto
 *         - fecha_inicio
 *         - fecha_fin
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the experiencia laboral
 *         candidato_id:
 *           type: string
 *           description: The id of the candidato
 *         empresa:
 *           type: string
 *           description: The company of the experiencia laboral
 *         puesto:
 *           type: string
 *           description: The position of the experiencia laboral
 *         fecha_inicio:
 *           type: string
 *           description: The start date of the experiencia laboral
 *         fecha_fin:
 *           type: string
 *           description: The end date of the experiencia laboral
 *         telefono_empresa:
 *           type: string
 *           description: The phone number of the company
 *         direccion_empresa:
 *           type: string
 *           description: The address of the company
 *         jefe_nombre:
 *           type: string
 *           description: The name of the boss
 *         jefe_telefono:
 *           type: string
 *           description: The phone number of the boss
 *         motivo_salida:
 *           type: string
 *           description: The reason for leaving
 *         responsabilidades:
 *           type: string
 *           description: The responsibilities
 *         salario:
 *           type: string
 *           description: The salary
 *       example:
 *         id: d5fE_asz
 *         candidato_id: c3fE_asz
 *         empresa: Company XYZ
 *         puesto: Developer
 *         fecha_inicio: 2020-01-01
 *         fecha_fin: 2021-01-01
 *         telefono_empresa: +1234567890
 *         direccion_empresa: 123 Main St
 *         jefe_nombre: John Doe
 *         jefe_telefono: +0987654321
 *         motivo_salida: Personal reasons
 *         responsabilidades: Developed software
 *         salario: 50000
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
export const getAllExperienciasLaborales = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al cargar experiencias laborales: ', errors);
      res.status(400).json({ errors: errors.array() });
  }
  try {
    const experienciasLaborales = await ExperienciaLaboral.findAll();
    logger.info("Experiencias laborales cargadas")
    res.status(200).json(experienciasLaborales);
  } catch (error) {
    logger.error('Error al cargar experiencias laborales: ', error);
    res.status(500).json({ error: 'Failed to fetch experiencias laborales' });
  }
};

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
export const getExperienciaLaboralById = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al cargar experiencia laboral: ', errors);
      res.status(400).json({ errors: errors.array() });
  }
  try {
    const id  = req.params.id;
    const experienciaLaboral = await ExperienciaLaboral.findByPk(id);
    if (experienciaLaboral) {
        logger.info(`Experiencia laboral con id: ${id} cargada.`)
      res.status(200).json(experienciaLaboral);
    } else {
        logger.error(`Experiencia laboral con id: ${id} no encontrada.`)
      res.status(404).json({ error: 'Experiencia laboral not found' });
    }
  } catch (error) {
    logger.error('Error al cargar experiencia laboral: ', error);
    res.status(500).json({ error: 'Failed to fetch experiencia laboral' });
  }
};

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
export const getExperienciasLaboralesByCandidatoId = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al cargar experiencias laborales: ', errors);
      res.status(400).json({ errors: errors.array() });
  }
  try {
        const candidato_id = req.params.candidato_id;
        const experienciasLaborales = await ExperienciaLaboral.findAll({ where: { candidato_id: candidato_id } });
        logger.info(`Experiencias laborales del candidato con candidato_id: ${candidato_id} cargadas.`)
        res.status(200).json(experienciasLaborales);
    } catch (error) {
    logger.error('Error al cargar experiencias laborales: ', error);
        res.status(500).json({ error: 'Failed to fetch experiencias laborales' });
    }
};

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
 *         description: Experiencia laboral created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExperienciaLaboral'
 *       500:
 *         description: Failed to create experiencia laboral
 */
export const createExperienciaLaboral = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al crear experiencia laboral: ', errors);
    res.status(400).json({ errors: errors.array() });
  }
  try {
    const experienciaLaboral = await ExperienciaLaboral.create(req.body);
    logger.info("Experiencia laboral creada")
    res.status(201).json(experienciaLaboral);
  } catch (error) {
    logger.error('Error al crear experiencia laboral: ', error);
    res.status(500).json({ error: 'Failed to create experiencia laboral' });
  }
};

/**
 * @swagger
 * /experiencias-laborales/{id}:
 *   put:
 *     summary: Update an existing experiencia laboral
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
 *         description: Experiencia laboral updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExperienciaLaboral'
 *       404:
 *         description: Experiencia laboral not found
 *       500:
 *         description: Failed to update experiencia laboral
 */
export const updateExperienciaLaboral = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al actualizar experiencia laboral: ', errors);
      res.status(400).json({ errors: errors.array() });
  }
  try {
    const id  = req.params.id;
    const [updated] = await ExperienciaLaboral.update(req.body, { where: { id } });
    if (updated) {
      const updatedExperienciaLaboral = await ExperienciaLaboral.findByPk(id);
        logger.info("Experiencia laboral actualizada")
      res.status(200).json(updatedExperienciaLaboral);
    } else {
        logger.error(`Experiencia laboral con id: ${id} no encontrada.`)
      res.status(404).json({ error: 'Experiencia laboral not found' });
    }
  } catch (error) {
    logger.error('Error al actualizar experiencia laboral: ', error);
    res.status(500).json({ error: 'Failed to update experiencia laboral' });
  }
};

/**
 * @swagger
 * /experiencias-laborales/{id}:
 *   delete:
 *     summary: Remove a experiencia laboral
 *     tags: [ExperienciasLaborales]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The experiencia laboral ID
 *     responses:
 *       204:
 *         description: Experiencia laboral deleted
 *       404:
 *         description: Experiencia laboral not found
 *       500:
 *         description: Failed to delete experiencia laboral
 */
export const deleteExperienciaLaboral = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al eliminar experiencia laboral: ', errors);
      res.status(400).json({ errors: errors.array() });
  }
  try {
    const id  = req.params.id;
    const deleted = await ExperienciaLaboral.destroy({ where: { id } });
    if (deleted) {
        logger.info(`Experiencia laboral con id: ${id} eliminada.`)
      res.status(204).send();
    } else {
        logger.error(`Experiencia laboral con id: ${id} no encontrada.`)
      res.status(404).json({ error: 'Experiencia laboral not found' });
    }
  } catch (error) {
    logger.error('Error al eliminar experiencia laboral: ', error);
    res.status(500).json({ error: 'Failed to delete experiencia laboral' });
  }
};