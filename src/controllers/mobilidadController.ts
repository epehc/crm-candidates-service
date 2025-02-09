import { Request } from "@epehc/sharedutilities/types/express";
import { Response } from "express";
import Mobilidad from '../models/mobilidad';
import {validationResult} from "express-validator";
import logger from "../utils/logger";

/**
 * @swagger
 * components:
 *   schemas:
 *     Mobilidad:
 *       type: object
 *       required:
 *         - candidato_id
 *         - licencia
 *         - vehiculo
 *         - viaje_interior
 *         - viaje_exterior
 *       properties:
 *         candidato_id:
 *           type: string
 *           description: The ID of the candidato
 *         licencia:
 *           type: string
 *           description: The license of the candidato
 *         licencia_tipo:
 *           type: string
 *           description: The type of license
 *         licencia_fecha_expiracion:
 *           type: string
 *           description: The expiration date of the license
 *         tiempo_conduciendo:
 *           type: string
 *           description: The driving experience time
 *         vehiculo:
 *           type: string
 *           description: The vehicle of the candidato
 *         vehiculo_tipo:
 *           type: string
 *           description: The type of vehicle
 *         vehiculo_modelo:
 *           type: string
 *           description: The model of the vehicle
 *         viaje_interior:
 *           type: string
 *           description: The interior travel preference
 *         viaje_exterior:
 *           type: string
 *           description: The exterior travel preference
 *       example:
 *         candidato_id: d5fE_asz
 *         licencia: B
 *         licencia_tipo: Automovil
 *         licencia_fecha_expiracion: 2025-12-31
 *         tiempo_conduciendo: 5 años
 *         vehiculo: Si
 *         vehiculo_tipo: Sedan
 *         vehiculo_modelo: 2020
 *         viaje_interior: Si
 *         viaje_exterior: No
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
export const getAllMobilidades = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al cargar mobilidades: ', errors);
      res.status(400).json({ errors: errors.array() });
      return
  }
  try {
    const mobilidades = await Mobilidad.findAll();
    logger.info("Mobilidades cargadas")
    res.status(200).json(mobilidades);
    return
  } catch (error) {
    logger.error('Error al cargar mobilidades: ', error);
    res.status(500).json({ error: 'Failed to fetch mobilidades' });
    return
  }
};

/**
 * @swagger
 * /mobilidades/{candidato_id}:
 *   get:
 *     summary: Get a mobilidad by candidato ID
 *     tags: [Mobilidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The candidato ID
 *     responses:
 *       200:
 *         description: The mobilidad description by candidato ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mobilidad'
 *       404:
 *         description: Mobilidad not found
 *       500:
 *         description: Failed to fetch mobilidad
 */
export const getMobilidadByCandidatoId = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al cargar mobilidad: ', errors);
      res.status(400).json({ errors: errors.array() });
      return
  }
  try {
    const candidato_id = req.params.candidato_id;
    const mobilidad = await Mobilidad.findByPk(candidato_id);
    if (mobilidad) {
        logger.info(`Mobilidad con candidato_id: ${candidato_id} cargado.`)
      res.status(200).json(mobilidad);
      return
    } else {
        logger.error(`Mobilidad con candidato_id: ${candidato_id} no encontrada.`)
      res.status(404).json({ error: 'Mobilidad not found' });
      return
    }
  } catch (error) {
    logger.error('Error al cargar mobilidad: ', error);
    res.status(500).json({ error: 'Failed to fetch mobilidad' });
    return
  }
};

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
 *         description: The mobilidad was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mobilidad'
 *       400:
 *         description: Error in request
 *       500:
 *         description: Failed to create mobilidad
 */
export const createMobilidad = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al crear mobilidad: ', errors);
    res.status(400).json({ errors: errors.array() });
    return
  }
  try {
    const mobilidad = await Mobilidad.create(req.body);
    logger.info("Mobilidad creada")
    res.status(201).json(mobilidad);
    return
  } catch (error) {
    logger.error('Error al crear mobilidad: ', error);
    res.status(500).json({ error: 'Failed to create mobilidad' });
    return
  }
};

/**
 * @swagger
 * /mobilidades/{candidato_id}:
 *   put:
 *     summary: Update a mobilidad
 *     tags: [Mobilidades]
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
 *             $ref: '#/components/schemas/Mobilidad'
 *     responses:
 *       200:
 *         description: The mobilidad was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mobilidad'
 *       400:
 *         description: Error in request
 *       404:
 *         description: Mobilidad not found
 *       500:
 *         description: Failed to update mobilidad
 */
export const updateMobilidad = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al actualizar mobilidad: ', errors);
      res.status(400).json({ errors: errors.array() });
      return
  }
  try {
    const candidato_id  = req.params.candidato_id;
    const [updated] = await Mobilidad.update(req.body, { where: { candidato_id } });
    if (updated) {
      const updatedMobilidad = await Mobilidad.findByPk(candidato_id);
        logger.info("Mobilidad actualizada")
      res.status(200).json(updatedMobilidad);
      return
    } else {
        logger.error(`Mobilidad con candidato_id: ${candidato_id} no encontrada.`)
      res.status(404).json({ error: 'Mobilidad not found' });
      return
    }
  } catch (error) {
    logger.error('Error al actualizar mobilidad: ', error);
    res.status(500).json({ error: 'Failed to update mobilidad' });
    return
  }
};

/**
 * @swagger
 * /mobilidades/{candidato_id}:
 *   delete:
 *     summary: Remove a mobilidad
 *     tags: [Mobilidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The candidato ID
 *     responses:
 *       204:
 *         description: The mobilidad was successfully deleted
 *       404:
 *         description: Mobilidad not found
 *       500:
 *         description: Failed to delete mobilidad
 */
export const deleteMobilidad = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al eliminar mobilidad: ', errors)
      res.status(400).json({ errors: errors.array() });
      return
  }
  try {
    const candidato_id  = req.params.candidato_id;
    const deleted = await Mobilidad.destroy({ where: { candidato_id } });
    if (deleted) {
        logger.info(`Mobilidad con candidato_id: ${candidato_id} eliminada.`)
      res.status(204).send();
      return
    } else {
        logger.error(`Mobilidad con candidato_id: ${candidato_id} no encontrada.`)
      res.status(404).json({ error: 'Mobilidad not found' });
      return
    }
  } catch (error) {
    logger.error('Error al eliminar mobilidad: ', error);
    res.status(500).json({ error: 'Failed to delete mobilidad' });
    return
  }
};