// controllers/informacionPersonalController.ts
import { Request, Response } from 'express';
import InformacionPersonal from '../models/informacionPersonal';
import {validationResult} from "express-validator";
import logger from "../utils/logger";

export const getAllInformacionesPersonales = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al cargar informaciones personales: ', errors);
      res.status(400).json({ errors: errors.array() });
  }
  try {
    const informacionesPersonales = await InformacionPersonal.findAll();
    logger.info("Informaciones personales cargadas")
    res.status(200).json(informacionesPersonales);
  } catch (error) {
    logger.error('Error al cargar informaciones personales: ', error);
    res.status(500).json({ error: 'Failed to fetch informaciones personales' });
  }
};

export const getInformacionPersonalByCandidatoId = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al cargar informacion personal: ', errors);
      res.status(400).json({ errors: errors.array() });
  }
  try {
    const { candidato_id } = req.params;
    const informacionPersonal = await InformacionPersonal.findByPk(candidato_id);
    if (informacionPersonal) {
      logger.info(`Informacion personal con candidato_id: ${candidato_id} cargada.`)
      res.status(200).json(informacionPersonal);
    } else {
        logger.error(`Informacion personal con candidato_id: ${candidato_id} no encontrada.`)
      res.status(404).json({ error: 'Informacion personal not found' });
    }
  } catch (error) {
    logger.error('Error al cargar informacion personal: ', error);
    res.status(500).json({ error: 'Failed to fetch informacion personal' });
  }
};

export const createInformacionPersonal = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al crear informacion personal: ', errors);
    res.status(400).json({ errors: errors.array() });
  }
  try {
    const informacionPersonal = await InformacionPersonal.create(req.body);
    logger.info("Informacion personal creada")
    res.status(201).json(informacionPersonal);
  } catch (error) {
    logger.error('Error al crear informacion personal: ', error);
    res.status(500).json({ error: 'Failed to create informacion personal' });
  }
};

export const updateInformacionPersonal = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al actualizar informacion personal: ', errors);
      res.status(400).json({ errors: errors.array() });
  }
  try {
    const { candidato_id } = req.params;
    const [updated] = await InformacionPersonal.update(req.body, { where: { candidato_id } });
    if (updated) {
      const updatedInformacionPersonal = await InformacionPersonal.findByPk(candidato_id);
        logger.info("Informacion personal actualizada")
      res.status(200).json(updatedInformacionPersonal);
    } else {
        logger.error(`Informacion personal con candidato_id: ${candidato_id} no encontrada.`)
      res.status(404).json({ error: 'Informacion personal not found' });
    }
  } catch (error) {
    logger.error('Error al actualizar informacion personal: ', error);
    res.status(500).json({ error: 'Failed to update informacion personal' });
  }
};

export const deleteInformacionPersonal = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al eliminar informacion personal: ', errors);
      res.status(400).json({ errors: errors.array() });
  }
  try {
    const { candidato_id } = req.params;
    const deleted = await InformacionPersonal.destroy({ where: { candidato_id } });
    if (deleted) {
        logger.info(`Informacion personal con candidato_id: ${candidato_id} eliminada.`)
      res.status(204).send();
    } else {
        logger.error(`Informacion personal con candidato_id: ${candidato_id} no encontrada.`)
      res.status(404).json({ error: 'Informacion personal not found' });
    }
  } catch (error) {
    logger.error('Error al eliminar informacion personal: ', error);
    res.status(500).json({ error: 'Failed to delete informacion personal' });
  }
};