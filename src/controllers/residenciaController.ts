import { Request } from "@epehc/sharedutilities/types/express";
import { Response } from "express";
import Residencia from '../models/residencia';
import {validationResult} from "express-validator";
import logger from "../utils/logger";

/**
 * @swagger
 * components:
 *   schemas:
 *     Residencia:
 *       type: object
 *       required:
 *         - candidato_id
 *         - vive_con
 *         - calle
 *         - zona
 *         - municipio
 *         - departamento
 *         - pais_de_residencia
 *       properties:
 *         candidato_id:
 *           type: string
 *           description: The ID of the candidato
 *         vive_con:
 *           type: string
 *           description: Who the candidato lives with
 *         calle:
 *           type: string
 *           description: The street of the residencia
 *         zona:
 *           type: string
 *           description: The zone of the residencia
 *         municipio:
 *           type: string
 *           description: The municipality of the residencia
 *         departamento:
 *           type: string
 *           description: The department of the residencia
 *         pais_de_residencia:
 *           type: string
 *           description: The country of the residencia
 *       example:
 *         candidato_id: d5fE_asz
 *         vive_con: Familia
 *         calle: 5ta Avenida
 *         zona: 10
 *         municipio: Guatemala
 *         departamento: Guatemala
 *         pais_de_residencia: Guatemala
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
export const getAllResidencias = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al cargar residencias: ', errors);
      res.status(400).json({ errors: errors.array() });
      return
  }
  try {
    const residencias = await Residencia.findAll();
    logger.info("Residencias cargadas")
    res.status(200).json(residencias);
    return
  } catch (error) {
    logger.error('Error al cargar residencias: ', error);
    res.status(500).json({ error: 'Failed to fetch residencias' });
    return
  }
};

/**
 * @swagger
 * /residencias/{candidato_id}:
 *   get:
 *     summary: Retrieve a single residencia
 *     tags: [Residencias]
 *     parameters:
 *       - in: path
 *         name: candidato_id
 *         required: true
 *         description: ID of the candidato
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single residencia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Residencia'
 *       404:
 *         description: Residencia not found
 *       500:
 *         description: Failed to fetch residencia
 */
export const getResidenciaByCandidatoId = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al cargar residencia: ', errors);
      res.status(400).json({ errors: errors.array() });
      return
  }
  try {
    const candidato_id = req.params.candidato_id;
    const residencia = await Residencia.findByPk(candidato_id);
    if (residencia) {
        logger.info(`Residencia con candidato_id: ${candidato_id} cargada.`)
      res.status(200).json(residencia);
      return
    } else {
        logger.error(`Residencia con candidato_id: ${candidato_id} no encontrada.`)
      res.status(404).json({ error: 'Residencia not found' });
      return
    }
  } catch (error) {
    logger.error('Error al cargar residencia: ', error);
    res.status(500).json({ error: 'Failed to fetch residencia' });
    return
  }
};

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
export const createResidencia = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al crear residencia: ', errors);
    res.status(400).json({ errors: errors.array() });
    return
  }
  try {
    const residencia = await Residencia.create(req.body);
    logger.info("Residencia creada")
    res.status(201).json(residencia);
    return
  } catch (error) {
    logger.error('Error al crear residencia: ', error);
    res.status(500).json({ error: 'Failed to create residencia' });
    return
  }
};

/**
 * @swagger
 * /residencias/{candidato_id}:
 *   put:
 *     summary: Update a residencia
 *     tags: [Residencias]
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
 *             $ref: '#/components/schemas/Residencia'
 *     responses:
 *       200:
 *         description: Residencia updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Residencia'
 *       404:
 *         description: Residencia not found
 *       500:
 *         description: Failed to update residencia
 */
export const updateResidencia = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al actualizar residencia: ', errors);
      res.status(400).json({ errors: errors.array() });
      return
  }
  try {
    const candidato_id  = req.params.candidato_id;
    const [updated] = await Residencia.update(req.body, { where: { candidato_id } });
    if (updated) {
      const updatedResidencia = await Residencia.findByPk(candidato_id);
        logger.info("Residencia actualizada")
      res.status(200).json(updatedResidencia);
      return
    } else {
        logger.error(`Residencia con candidato_id: ${candidato_id} no encontrada.`)
      res.status(404).json({ error: 'Residencia not found' });
      return
    }
  } catch (error) {
    logger.error('Error al actualizar residencia: ', error);
    res.status(500).json({ error: 'Failed to update residencia' });
    return
  }
};

/**
 * @swagger
 * /residencias/{candidato_id}:
 *   delete:
 *     summary: Remove a residencia
 *     tags: [Residencias]
 *     parameters:
 *       - in: path
 *         name: candidato_id
 *         required: true
 *         description: ID of the candidato
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Residencia deleted
 *       404:
 *         description: Residencia not found
 *       500:
 *         description: Failed to delete residencia
 */
export const deleteResidencia = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al eliminar residencia: ', errors);
      res.status(400).json({ errors: errors.array() });
      return
  }
  try {
    const candidato_id  = req.params.candidato_id;
    const deleted = await Residencia.destroy({ where: { candidato_id } });
    if (deleted) {
        logger.info(`Residencia con candidato_id: ${candidato_id} eliminada.`)
      res.status(204).send();
      return
    } else {
        logger.error(`Residencia con candidato_id: ${candidato_id} no encontrada.`)
      res.status(404).json({ error: 'Residencia not found' });
      return
    }
  } catch (error) {
    logger.error('Error al eliminar residencia: ', error);
    res.status(500).json({ error: 'Failed to delete residencia' });
    return
  }
};