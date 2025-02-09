import { Request } from "@epehc/sharedutilities/types/express";
import { Response } from "express";
import InformacionPersonal from '../models/informacionPersonal';
import {validationResult} from "express-validator";
import logger from "../utils/logger";

/**
 * @swagger
 * components:
 *   schemas:
 *     InformacionPersonal:
 *       type: object
 *       required:
 *         - candidato_id
 *         - dpi
 *         - nacionalidad
 *         - estado_civil
 *         - software
 *         - partido_politico
 *         - sindicato
 *         - adjetivos
 *         - enfermedad
 *         - nivel_estudios
 *         - personas_dependientes
 *       properties:
 *         candidato_id:
 *           type: string
 *           description: The ID of the candidato
 *         dpi:
 *           type: string
 *           description: The DPI of the candidato
 *         nacionalidad:
 *           type: string
 *           description: The nationality of the candidato
 *         estado_civil:
 *           type: string
 *           description: The marital status of the candidato
 *         religion:
 *           type: string
 *           description: The religion of the candidato
 *         software:
 *           type: string
 *           description: The software skills of the candidato
 *         partido_politico:
 *           type: string
 *           description: The political party of the candidato
 *         sindicato:
 *           type: string
 *           description: The union of the candidato
 *         adjetivos:
 *           type: string
 *           description: The adjectives describing the candidato
 *         impedimento_fisico:
 *           type: string
 *           description: The physical impediment of the candidato
 *         enfermedad:
 *           type: string
 *           description: The illness of the candidato
 *         nivel_estudios:
 *           type: string
 *           description: The education level of the candidato
 *         estudios_adicionales:
 *           type: string
 *           description: Additional studies of the candidato
 *         idiomas:
 *           type: string
 *           description: The languages spoken by the candidato
 *         personas_dependientes:
 *           type: string
 *           description: The dependents of the candidato
 *         fecha_nacimiento:
 *           type: string
 *           description: The birth date of the candidato
 *         edad:
 *           type: string
 *           description: The age of the candidato
 *       example:
 *         candidato_id: d5fE_asz
 *         dpi: 1234567890123
 *         nacionalidad: Guatemalteco
 *         estado_civil: Soltero
 *         religion: Catolico
 *         software: Microsoft Office
 *         partido_politico: Ninguno
 *         sindicato: Ninguno
 *         adjetivos: Responsable, Puntual
 *         impedimento_fisico: Ninguno
 *         enfermedad: Ninguna
 *         nivel_estudios: Universitario
 *         estudios_adicionales: Curso de Ingles
 *         idiomas: Espanol, Ingles
 *         personas_dependientes: 2
 *         fecha_nacimiento: 1990-01-01
 *         edad: 33
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
export const getAllInformacionesPersonales = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al cargar informaciones personales: ', errors);
      res.status(400).json({ errors: errors.array() });
      return
  }
  try {
    const informacionesPersonales = await InformacionPersonal.findAll();
    logger.info("Informaciones personales cargadas")
    res.status(200).json(informacionesPersonales);
    return
  } catch (error) {
    logger.error('Error al cargar informaciones personales: ', error);
    res.status(500).json({ error: 'Failed to fetch informaciones personales' });
    return
  }
};

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
export const getInformacionPersonalByCandidatoId = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al cargar informacion personal: ', errors);
      res.status(400).json({ errors: errors.array() });
      return
  }
  try {
    const candidato_id = req.params.candidato_id;
    const informacionPersonal = await InformacionPersonal.findByPk(candidato_id);
    if (informacionPersonal) {
      logger.info(`Informacion personal con candidato_id: ${candidato_id} cargada.`)
      res.status(200).json(informacionPersonal);
      return
    } else {
        logger.error(`Informacion personal con candidato_id: ${candidato_id} no encontrada.`)
      res.status(404).json({ error: 'Informacion personal not found' });
      return
    }
  } catch (error) {
    logger.error('Error al cargar informacion personal: ', error);
    res.status(500).json({ error: 'Failed to fetch informacion personal' });
    return
  }
};

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
 *       400:
 *         description: Bad request
 *       500:
 *         description: Failed to create informacion personal
 */
export const createInformacionPersonal = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al crear informacion personal: ', errors);
    res.status(400).json({ errors: errors.array() });
    return
  }
  try {
    const informacionPersonal = await InformacionPersonal.create(req.body);
    logger.info("Informacion personal creada")
    res.status(201).json(informacionPersonal);
    return
  } catch (error) {
    logger.error('Error al crear informacion personal: ', error);
    res.status(500).json({ error: 'Failed to create informacion personal' });
    return
  }
};

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
 *         description: The informacion personal was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InformacionPersonal'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Informacion personal not found
 *       500:
 *         description: Failed to update informacion personal
 */
export const updateInformacionPersonal = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      logger.error('Error al actualizar informacion personal: '+ JSON.stringify(errors.array()));
      res.status(400).json({ errors: errors.array() });
      return
  }
  try {
    const candidato_id  = req.params.candidato_id;
    const [updated] = await InformacionPersonal.update(req.body, { where: { candidato_id } });
    if (updated) {
      const updatedInformacionPersonal = await InformacionPersonal.findByPk(candidato_id);
        logger.info("Informacion personal actualizada")
      res.status(200).json(updatedInformacionPersonal);
      return
    } else {
      logger.error(`Informacion personal con candidato_id: ${candidato_id} no encontrada.`)
      res.status(404).json({ error: 'Informacion personal not found' });
      return
    }
  } catch (error) {
    logger.error('Error al actualizar informacion personal: ', error);
    res.status(500).json({ error: 'Failed to update informacion personal' });
    return
  }
};

/**
 * @swagger
 * /informaciones-personales/{candidato_id}:
 *   delete:
 *     summary: Remove a informacion personal
 *     tags: [InformacionesPersonales]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The candidato ID
 *     responses:
 *       204:
 *         description: The informacion personal was deleted
 *       404:
 *         description: Informacion personal not found
 *       500:
 *         description: Failed to delete informacion personal
 */
export const deleteInformacionPersonal = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al eliminar informacion personal: ', errors);
      res.status(400).json({ errors: errors.array() });
      return
  }
  try {
    const candidato_id = req.params.candidato_id;
    const deleted = await InformacionPersonal.destroy({ where: { candidato_id } });
    if (deleted) {
        logger.info(`Informacion personal con candidato_id: ${candidato_id} eliminada.`)
      res.status(204).send();
      return
    } else {
        logger.error(`Informacion personal con candidato_id: ${candidato_id} no encontrada.`)
      res.status(404).json({ error: 'Informacion personal not found' });
      return
    }
  } catch (error) {
    logger.error('Error al eliminar informacion personal: ', error);
    res.status(500).json({ error: 'Failed to delete informacion personal' });
    return
  }
};