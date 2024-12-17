// controllers/viciosController.ts
import { Request, Response } from 'express';
import Vicios from '../models/vicios';
import {validationResult} from "express-validator";
import logger from "../utils/logger";

/**
 * @swagger
 * components:
 *   schemas:
 *     Vicios:
 *       type: object
 *       required:
 *         - candidato_id
 *         - fuma
 *         - alcohol
 *         - alcohol_frecuencia
 *         - drogas
 *         - tatuajes
 *       properties:
 *         candidato_id:
 *           type: string
 *           description: The ID of the candidato
 *         fuma:
 *           type: string
 *           description: Smoking habit of the candidato
 *         alcohol:
 *           type: string
 *           description: Alcohol consumption of the candidato
 *         alcohol_frecuencia:
 *           type: string
 *           description: Frequency of alcohol consumption
 *         drogas:
 *           type: string
 *           description: Drug use of the candidato
 *         tatuajes:
 *           type: string
 *           description: Tattoos of the candidato
 *       example:
 *         candidato_id: d5fE_asz
 *         fuma: No
 *         alcohol: Si
 *         alcohol_frecuencia: Ocasionalmente
 *         drogas: No
 *         tatuajes: Si
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
export const getAllVicios = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al cargar vicios: ', errors);
      res.status(400).json({ errors: errors.array() });
  }
  try {
    const vicios = await Vicios.findAll();
    logger.info("Vicios cargados")
    res.status(200).json(vicios);
  } catch (error) {
    logger.error('Error al cargar vicios: ', error);
    res.status(500).json({ error: 'Failed to fetch vicios' });
  }
};

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
export const getViciosByCandidatoId = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al cargar vicios: ', errors);
      res.status(400).json({ errors: errors.array() });
  }
  try {
    const { candidato_id } = req.params;
    const vicios = await Vicios.findByPk(candidato_id);
    if (vicios) {
        logger.info(`Vicios del candidato con candidato_id: ${candidato_id} cargados.`)
      res.status(200).json(vicios);
    } else {
        logger.error(`Vicios del candidato con candidato_id: ${candidato_id} no encontrados.`)
      res.status(404).json({ error: 'Vicios not found' });
    }
  } catch (error) {
    logger.error('Error al cargar vicios: ', error);
    res.status(500).json({ error: 'Failed to fetch vicios' });
  }
};

/**
 * @swagger
 * /vicios:
 *   post:
 *     summary: Create a new vicios
 *     tags: [Vicios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vicios'
 *     responses:
 *       201:
 *         description: Vicios created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vicios'
 *       500:
 *         description: Failed to create vicios
 */
export const createVicios = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al crear vicios: ', errors);
    res.status(400).json({ errors: errors.array() });
  }
  try {
    const vicios = await Vicios.create(req.body);
    logger.info("Vicios creados")
    res.status(201).json(vicios);
  } catch (error) {
    logger.error('Error al crear vicios: ', error);
    res.status(500).json({ error: 'Failed to create vicios' });
  }
};

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
 *       404:
 *         description: Vicios not found
 *       500:
 *         description: Failed to update vicios
 */
export const updateVicios = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al actualizar vicios: ', errors);
      res.status(400).json({ errors: errors.array() });
  }
  try {
    const { candidato_id } = req.params;
    const [updated] = await Vicios.update(req.body, { where: { candidato_id } });
    if (updated) {
      const updatedVicios = await Vicios.findByPk(candidato_id);
        logger.info("Vicios actualizados")
      res.status(200).json(updatedVicios);
    } else {
        logger.error(`Vicios del candidato con candidato_id: ${candidato_id} no encontrados.`)
      res.status(404).json({ error: 'Vicios not found' });
    }
  } catch (error) {
    logger.error('Error al actualizar vicios: ', error);
    res.status(500).json({ error: 'Failed to update vicios' });
  }
};

/**
 * @swagger
 * /vicios/{candidato_id}:
 *   delete:
 *     summary: Remove an existing vicios
 *     tags: [Vicios]
 *     parameters:
 *       - in: path
 *         name: candidato_id
 *         required: true
 *         description: ID of the candidato
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Vicios deleted
 *       404:
 *         description: Vicios not found
 *       500:
 *         description: Failed to delete vicios
 */
export const deleteVicios = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al eliminar vicios: ', errors);
      res.status(400).json({ errors: errors.array() });
  }
  try {
    const { candidato_id } = req.params;
    const deleted = await Vicios.destroy({ where: { candidato_id } });
    if (deleted) {
        logger.info("Vicios eliminados")
      res.status(204).send();
    } else {
        logger.error(`Vicios del candidato con candidato_id: ${candidato_id} no encontrados.`)
      res.status(404).json({ error: 'Vicios not found' });
    }
  } catch (error) {
    logger.error('Error al eliminar vicios: ', error);
    res.status(500).json({ error: 'Failed to delete vicios' });
  }
};