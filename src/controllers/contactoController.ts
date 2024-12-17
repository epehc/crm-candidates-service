// controllers/contactoController.ts
import { Request, Response } from 'express';
import Contacto from '../models/contacto';
import {validationResult} from "express-validator";
import logger from "../utils/logger";


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

export const getContactosByCandidatoId = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al cargar contactos: ', errors);
    res.status(400).json({ errors: errors.array() });
  }
  try {
        const { candidato_id } = req.params;
        const contactos = await Contacto.findAll({ where: { candidato_id } });
        logger.info(`Contactos del candidato con candidato_id: ${candidato_id} cargados.`)
        res.status(200).json(contactos);
    } catch (error) {
    logger.error('Error al cargar contactos: ', error);
        res.status(500).json({ error: 'Failed to fetch contactos' });
    }
};

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

export const updateContacto = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al actualizar contacto: ', errors);
    res.status(400).json({ errors: errors.array() });
  }
  try {
    const { id } = req.params;
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

export const deleteContacto = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al eliminar contacto: ', errors);
    res.status(400).json({ errors: errors.array() });
  }
  try {
    const { id } = req.params;
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