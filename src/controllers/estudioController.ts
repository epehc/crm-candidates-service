import { Request } from "@epehc/sharedutilities/types/express";
import { Response } from "express";
import Estudio from '../models/estudio';
import {validationResult} from "express-validator";
import logger from "../utils/logger";

/**
 * @swagger
 * components:
 *   schemas:
 *     Estudio:
 *       type: object
 *       required:
 *         - id
 *         - candidato_id
 *         - institucion
 *         - titulo
 *         - grado
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the estudio
 *         candidato_id:
 *           type: string
 *           description: The id of the candidato
 *         institucion:
 *           type: string
 *           description: The institution of the estudio
 *         titulo:
 *           type: string
 *           description: The title of the estudio
 *         grado:
 *           type: string
 *           description: The grade of the estudio
 *       example:
 *         id: d5fE_asz
 *         candidato_id: c3fE_asz
 *         institucion: Universidad XYZ
 *         titulo: Ingenieria en Sistemas
 *         grado: Licenciatura
 */

/**
 * @swagger
 * /estudios:
 *   get:
 *     summary: Retrieve a list of estudios
 *     tags: [Estudios]
 *     responses:
 *       200:
 *         description: A list of estudios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Estudio'
 *       500:
 *         description: Failed to fetch estudios
 */
export const getAllEstudios = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al cargar estudios: ', errors);
    res.status(400).json({ errors: errors.array() });
    return
  }
  try {
    const estudios = await Estudio.findAll();
    logger.info("Estudios cargados")
    res.status(200).json(estudios);
    return
  } catch (error) {
    logger.error('Error al cargar estudios: ', error);
    res.status(500).json({ error: 'Failed to fetch estudios' });
    return
  }
};

/**
 * @swagger
 * /estudios/{id}:
 *   get:
 *     summary: Get a estudio by ID
 *     tags: [Estudios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The estudio ID
 *     responses:
 *       200:
 *         description: The estudio description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estudio'
 *       404:
 *         description: Estudio not found
 *       500:
 *         description: Failed to fetch estudio
 */
export const getEstudioById = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al cargar estudio: ', errors);
    res.status(400).json({ errors: errors.array() });
    return
  }
  try {
    const id  = req.params.id;
    const estudio = await Estudio.findByPk(id);
    if (estudio) {
      logger.info(`Estudio con id: ${id} cargado.`)
      res.status(200).json(estudio);
      return
    } else {
      logger.error(`Estudio con id: ${id} no encontrado.`)
      res.status(404).json({ error: 'Estudio not found' });
      return
    }
  } catch (error) {
    logger.error('Error al cargar estudio: ', error);
    res.status(500).json({ error: 'Failed to fetch estudio' });
    return
  }
};

/**
 * @swagger
 * /estudios/candidato/{candidato_id}:
 *   get:
 *     summary: Get estudios by candidato ID
 *     tags: [Estudios]
 *     parameters:
 *       - in: path
 *         name: candidato_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The candidato ID
 *     responses:
 *       200:
 *         description: The estudios description by candidato ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Estudio'
 *       404:
 *         description: Estudios not found
 *       500:
 *         description: Failed to fetch estudios
 */
export const getEstudiosByCandidatoId = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al cargar estudios: ', errors);
      res.status(400).json({ errors: errors.array() });
      return
  }
  try {
    const candidato_id = req.params.candidato_id;
    const estudios = await Estudio.findAll({ where: { candidato_id: candidato_id } });
    logger.info(`Estudios del candidato con candidato_id: ${candidato_id} cargados.`)
    res.status(200).json(estudios);
    return
  } catch (error) {
    logger.error('Error al cargar estudios: ', error);
    res.status(500).json({ error: 'Failed to fetch estudios' });
    return
  }
};

/**
 * @swagger
 * /estudios:
 *   post:
 *     summary: Create a new estudio
 *     tags: [Estudios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Estudio'
 *     responses:
 *       201:
 *         description: The estudio was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estudio'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Failed to create estudio
 */
export const createEstudio = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al crear estudio: ', errors);
     res.status(400).json({ errors: errors.array() });
     return
  }
  try {
    const estudio = await Estudio.create(req.body);
    logger.info("Estudio creado")
    res.status(201).json(estudio);
    return
  } catch (error) {
    logger.error('Error al crear estudio: ', error);
    res.status(500).json({ error: 'Failed to create estudio' });
    return
  }
};

/**
 * @swagger
 * /estudios/{id}:
 *   put:
 *     summary: Update an existing estudio
 *     tags: [Estudios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The estudio ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Estudio'
 *     responses:
 *       200:
 *         description: The estudio was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estudio'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Estudio not found
 *       500:
 *         description: Failed to update estudio
 */
export const updateEstudio = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al actualizar estudio: ', errors);
      res.status(400).json({ errors: errors.array() });
      return
  }
  try {
    const id  = req.params.id;
    const [updated] = await Estudio.update(req.body, { where: { id } });
    if (updated) {
      const updatedEstudio = await Estudio.findByPk(id);
      logger.info("Estudio actualizado")
      res.status(200).json(updatedEstudio);
      return
    } else {
        logger.error(`Estudio con id: ${id} no encontrado.`)
      res.status(404).json({ error: 'Estudio not found' });
      return
    }
  } catch (error) {
    logger.error('Error al actualizar estudio: ', error);
    res.status(500).json({ error: 'Failed to update estudio' });
    return
  }
};

/**
 * @swagger
 * /estudios/{id}:
 *   delete:
 *     summary: Remove an estudio
 *     tags: [Estudios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The estudio ID
 *     responses:
 *       204:
 *         description: The estudio was deleted
 *       404:
 *         description: Estudio not found
 *       500:
 *         description: Failed to delete estudio
 */
export const deleteEstudio = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al eliminar estudio: ', errors);
      res.status(400).json({ errors: errors.array() });
      return
  }
  try {
    const id  = req.params.id;
    const deleted = await Estudio.destroy({ where: { id } });
    if (deleted) {
        logger.info("Estudio eliminado")
      res.status(204).send();
      return
    } else {
        logger.error(`Estudio con id: ${id} no encontrado.`)
      res.status(404).json({ error: 'Estudio not found' });
      return
    }
  } catch (error) {
    logger.error('Error al eliminar estudio: ', error);
    res.status(500).json({ error: 'Failed to delete estudio' });
    return
  }
};