import { Request, Response } from 'express';
import Candidato from '../models/candidato';
import {validationResult} from "express-validator";
import logger from "../utils/logger";

/**
 * @swagger
 * components:
 *   schemas:
 *     Candidato:
 *       type: object
 *       required:
 *         - candidato_id
 *         - nombre
 *         - puesto_aplicado
 *         - como_se_entero
 *         - genero
 *         - telefono_whatsapp
 *         - telefono
 *         - correo
 *         - aspiracion_salarial
 *       properties:
 *         candidato_id:
 *           type: string
 *           description: The auto-generated id of the candidato
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: The timestamp of the candidato creation
 *         nombre:
 *           type: string
 *           description: The name of the candidato
 *         puesto_aplicado:
 *           type: string
 *           description: The position applied for by the candidato
 *         como_se_entero:
 *           type: string
 *           description: How the candidato learned about the position
 *         genero:
 *           type: string
 *           description: The gender of the candidato
 *         telefono_whatsapp:
 *           type: string
 *           description: The WhatsApp phone number of the candidato
 *         telefono:
 *           type: string
 *           description: The phone number of the candidato
 *         correo:
 *           type: string
 *           description: The email of the candidato
 *         aspiracion_salarial:
 *           type: string
 *           description: The salary aspiration of the candidato
 *       example:
 *         candidato_id: d5fE_asz
 *         timestamp: 2023-10-01T12:34:56Z
 *         nombre: John Doe
 *         puesto_aplicado: Developer
 *         como_se_entero: LinkedIn
 *         genero: Male
 *         telefono_whatsapp: +1234567890
 *         telefono: +0987654321
 *         correo: john.doe@example.com
 *         aspiracion_salarial: 50000
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
export const getAllCandidatos = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error('Error al cargar candidatos: ', errors);
        res.status(400).json({ errors: errors.array() });
    }
    try {
    const candidatos = await Candidato.findAll();
    logger.info("Candidatos cargados")
    res.status(200).json(candidatos);
  } catch (error) {
        logger.error('Error al cargar candidatos: ', error);
    res.status(500).json({ error: 'Failed to fetch candidatos' });
  }
};

/**
 * @swagger
 * /candidatos/{id}:
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
export const getCandidatoByCandidatoId = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error('Error al cargar candidato: ', errors);
        res.status(400).json({ errors: errors.array() });
    }
    try {
    const { candidato_id } = req.params;
    const candidato = await Candidato.findByPk(candidato_id);
    if (candidato) {
        logger.info(`Candidato con candidato_id: ${candidato_id} cargado.`)
      res.status(200).json(candidato);
    } else {
        logger.error(`Candidato con candidato_id: ${candidato_id} no encontrado.`)
      res.status(404).json({ error: 'Candidato not found' });
    }
  } catch (error) {
        logger.error('Error al cargar candidato: ', error);
    res.status(500).json({ error: 'Failed to fetch candidato' });
  }
};

/**
 * @swagger
 * /candidatos/email/{email}:
 *   get:
 *     summary: Get a candidato by email
 *     tags: [Candidatos]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The candidato email
 *     responses:
 *       200:
 *         description: The candidato description by email
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidato'
 *       404:
 *         description: Candidato not found
 *       500:
 *         description: Failed to fetch candidato
 */
export const getCandidatoByEmail = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error('Error al cargar candidato: ', errors);
        res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email } = req.params;
        const candidato = await Candidato.findOne({ where: { email } });
        if (candidato) {
            logger.info(`Candidato con email: ${email} cargado.`)
            res.status(200).json(candidato);
        } else {
            logger.error(`Candidato con email: ${email} no encontrado.`)
            res.status(404).json({ error: 'Candidato not found' });
        }
    } catch (error) {
        logger.error('Error al cargar candidato: ', error);
        res.status(500).json({ error: 'Failed to fetch candidato' });
    }
};

/**
 * @swagger
 * /candidatos/dpi/{dpi}:
 *   get:
 *     summary: Get a candidato by DPI
 *     tags: [Candidatos]
 *     parameters:
 *       - in: path
 *         name: dpi
 *         schema:
 *           type: string
 *         required: true
 *         description: The candidato DPI
 *     responses:
 *       200:
 *         description: The candidato description by DPI
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidato'
 *       404:
 *         description: Candidato not found
 *       500:
 *         description: Failed to fetch candidato
 */
export const getCandidatoByDPI = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error('Error al cargar candidato: ', errors);
        res.status(400).json({ errors: errors.array() });
    }
    try {
        const { dpi } = req.params;
        const candidato = await Candidato.findOne({ where: { dpi } });
        if (candidato) {
            logger.info(`Candidato con dpi: ${dpi} cargado.`)
            res.status(200).json(candidato);
        } else {
            logger.error(`Candidato con dpi: ${dpi} no encontrado.`)
            res.status(404).json({ error: 'Candidato not found' });
        }
    } catch (error) {
        logger.error('Error al cargar candidato: ', error);
        res.status(500).json({ error: 'Failed to fetch candidato' });
    }
};

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
 *         description: The candidato was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidato'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Failed to create candidato
 */
export const createCandidato = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      logger.error('Error al crear candidato: ', errors);
      res.status(400).json({ errors: errors.array() });
  }
  try {
      const candidato = await Candidato.create(req.body);
      logger.info("Candidato creado")
      res.status(201).json(candidato);
  } catch (error) {
      logger.error('Error al crear candidato: ', error);
      res.status(500).json({ error: 'Failed to create candidato' });
  }
};

/**
 * @swagger
 * /candidatos/{id}:
 *   put:
 *     summary: Update a candidato by ID
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
 *         description: The candidato was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidato'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Candidato not found
 *       500:
 *         description: Failed to update candidato
 */
export const updateCandidato = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error('Error al actualizar candidato: ', errors);
        res.status(400).json({ errors: errors.array() });
    }
    try {
    const { id } = req.params;
    const [updated] = await Candidato.update(req.body, { where: { id } });
    if (updated) {
      const updatedCandidato = await Candidato.findByPk(id);
        logger.info("Candidato actualizado")
        res.status(200).json(updatedCandidato);
    } else {
        logger.error(`Candidato con id: ${id} no encontrado.`)
      res.status(404).json({ error: 'Candidato not found' });
    }
  } catch (error) {
        logger.error('Error al actualizar candidato: ', error);
    res.status(500).json({ error: 'Failed to update candidato' });
  }
};

/**
 * @swagger
 * /candidatos/{id}:
 *   delete:
 *     summary: Delete a candidato by ID
 *     tags: [Candidatos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The candidato ID
 *     responses:
 *       204:
 *         description: The candidato was successfully deleted
 *       404:
 *         description: Candidato not found
 *       500:
 *         description: Failed to delete candidato
 */
export const deleteCandidato = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error('Error al eliminar candidato: ', errors);
        res.status(400).json({ errors: errors.array() });
    }
    try {
    const { id } = req.params;
    const deleted = await Candidato.destroy({ where: { id } });
    if (deleted) {
        logger.info("Candidato eliminado")
      res.status(204).send();
    } else {
        logger.error(`Candidato con id: ${id} no encontrado.`)
      res.status(404).json({ error: 'Candidato not found' });
    }
  } catch (error) {
        logger.error('Error al eliminar candidato: ', error);
    res.status(500).json({ error: 'Failed to delete candidato' });
  }
};