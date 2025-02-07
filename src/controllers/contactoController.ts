import { Request } from "@epehc/sharedutilities/types/express";
import { Response } from "express";
import Contacto from '../models/contacto';
import {validationResult} from "express-validator";
import logger from "../utils/logger";

/**
 * @swagger
 * components:
 *   schemas:
 *     Contacto:
 *       type: object
 *       required:
 *         - id
 *         - candidato_id
 *         - nombre
 *         - trabajo
 *         - telefono
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the contacto
 *         candidato_id:
 *           type: string
 *           description: The id of the candidato
 *         parentezco:
 *           type: string
 *           description: The relationship with the candidato
 *         nombre:
 *           type: string
 *           description: The name of the contacto
 *         trabajo:
 *           type: string
 *           description: The job of the contacto
 *         telefono:
 *           type: string
 *           description: The phone number of the contacto
 *       example:
 *         id: d5fE_asz
 *         candidato_id: c3fE_asz
 *         parentezco: Amigo
 *         nombre: John Doe
 *         trabajo: Developer
 *         telefono: +1234567890
 */

/**
 * @swagger
 * /contactos:
 *   get:
 *     summary: Retrieve a list of contactos
 *     tags: [Contactos]
 *     responses:
 *       200:
 *         description: A list of contactos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contacto'
 *       500:
 *         description: Failed to fetch contactos
 */
export const getAllContactos = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al cargar contactos: ', errors);
    res.status(400).json({ errors: errors.array() });
  }
  try {
    const contactos = await Contacto.findAll();
    logger.info("Contactos cargados")
    res.status(200).json(contactos);
  } catch (error) {
    logger.error('Error al cargar contactos: ', error);
    res.status(500).json({ error: 'Failed to fetch contactos' });
  }
};

/**
 * @swagger
 * /contactos/{id}:
 *   get:
 *     summary: Get a contacto by ID
 *     tags: [Contactos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The contacto ID
 *     responses:
 *       200:
 *         description: The contacto description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contacto'
 *       404:
 *         description: Contacto not found
 *       500:
 *         description: Failed to fetch contacto
 */
export const getContactoById = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al cargar contacto: ', errors);
    res.status(400).json({ errors: errors.array() });
  }
  try {
    const { id } = req.params;
    const contacto = await Contacto.findByPk(id);
    if (contacto) {
      logger.info(`Contacto con id: ${id} cargado.`)
      res.status(200).json(contacto);
    } else {
      logger.error(`Contacto con id: ${id} no encontrado.`)
      res.status(404).json({ error: 'Contacto not found' });
    }
  } catch (error) {
    logger.error('Error al cargar contacto: ', error);
    res.status(500).json({ error: 'Failed to fetch contacto' });
  }
};

/**
 * @swagger
 * /contactos/candidato/{candidato_id}:
 *   get:
 *     summary: Get contactos by candidato ID
 *     tags: [Contactos]
 *     parameters:
 *       - in: path
 *         name: candidato_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The candidato ID
 *     responses:
 *       200:
 *         description: The contactos description by candidato ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contacto'
 *       404:
 *         description: Contactos not found
 *       500:
 *         description: Failed to fetch contactos
 */
export const getContactosByCandidatoId = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al cargar contactos: ', errors);
    res.status(400).json({ errors: errors.array() });
  }
  try {
        const candidato_id  = req.params.candidato_id;
        const contactos = await Contacto.findAll({ where: { candidato_id: candidato_id } });
        logger.info(`Contactos del candidato con candidato_id: ${candidato_id} cargados.`)
        res.status(200).json(contactos);
    } catch (error) {
    logger.error('Error al cargar contactos: ', error);
        res.status(500).json({ error: 'Failed to fetch contactos' });
    }
};

/**
 * @swagger
 * /contactos:
 *   post:
 *     summary: Create a new contacto
 *     tags: [Contactos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contacto'
 *     responses:
 *       201:
 *         description: The contacto was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contacto'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Failed to create contacto
 */
export const createContacto = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al crear contacto: ', errors);
     res.status(400).json({ errors: errors.array() });
  }
  try {
    const contacto = await Contacto.create(req.body);
    logger.info("Contacto creado")
    res.status(201).json(contacto);
  } catch (error) {
    logger.error('Error al crear contacto: ', error);
    res.status(500).json({ error: 'Failed to create contacto' });
  }
};
/**
 * @swagger
 * /contactos/{id}:
 *   put:
 *     summary: Update a contacto by ID
 *     tags: [Contactos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The contacto ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contacto'
 *     responses:
 *       200:
 *         description: The contacto was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contacto'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Contacto not found
 *       500:
 *         description: Failed to update contacto
 */
export const updateContacto = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al actualizar contacto: ', errors);
    res.status(400).json({ errors: errors.array() });
  }
  try {
    const  id  = req.params.id;
    const [updated] = await Contacto.update(req.body, { where: { id } });
    if (updated) {
      const updatedContacto = await Contacto.findByPk(id);
      logger.info("Contacto actualizado")
      res.status(200).json(updatedContacto);
    } else {
      logger.error(`Contacto con id: ${id} no encontrado.`)
      res.status(404).json({ error: 'Contacto not found' });
    }
  } catch (error) {
    logger.error('Error al actualizar contacto: ', error);
    res.status(500).json({ error: 'Failed to update contacto' });
  }
};

/**
 * @swagger
 * /contactos/{id}:
 *   delete:
 *     summary: Delete a contacto by ID
 *     tags: [Contactos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The contacto ID
 *     responses:
 *       204:
 *         description: The contacto was successfully deleted
 *       404:
 *         description: Contacto not found
 *       500:
 *         description: Failed to delete contacto
 */
export const deleteContacto = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al eliminar contacto: ', errors);
    res.status(400).json({ errors: errors.array() });
  }
  try {
    const id = req.params.id;
    const deleted = await Contacto.destroy({ where: { id } });
    if (deleted) {
      logger.info("Contacto eliminado")
      res.status(204).send();
    } else {
      logger.error(`Contacto con id: ${id} no encontrado.`)
      res.status(404).json({ error: 'Contacto not found' });
    }
  } catch (error) {
    logger.error('Error al eliminar contacto: ', error);
    res.status(500).json({ error: 'Failed to delete contacto' });
  }
};