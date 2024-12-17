// controllers/mobilidadController.ts
import { Request, Response } from 'express';
import Mobilidad from '../models/mobilidad';
import {validationResult} from "express-validator";
import logger from "../utils/logger";

export const getAllMobilidades = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al cargar mobilidades: ', errors);
      res.status(400).json({ errors: errors.array() });
  }
  try {
    const mobilidades = await Mobilidad.findAll();
    logger.info("Mobilidades cargadas")
    res.status(200).json(mobilidades);
  } catch (error) {
    logger.error('Error al cargar mobilidades: ', error);
    res.status(500).json({ error: 'Failed to fetch mobilidades' });
  }
};

export const getMobilidadByCandidatoId = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al cargar mobilidad: ', errors);
      res.status(400).json({ errors: errors.array() });
  }
  try {
    const { candidato_id } = req.params;
    const mobilidad = await Mobilidad.findByPk(candidato_id);
    if (mobilidad) {
        logger.info(`Mobilidad con candidato_id: ${candidato_id} cargado.`)
      res.status(200).json(mobilidad);
    } else {
        logger.error(`Mobilidad con candidato_id: ${candidato_id} no encontrada.`)
      res.status(404).json({ error: 'Mobilidad not found' });
    }
  } catch (error) {
    logger.error('Error al cargar mobilidad: ', error);
    res.status(500).json({ error: 'Failed to fetch mobilidad' });
  }
};

export const createMobilidad = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al crear mobilidad: ', errors);
    res.status(400).json({ errors: errors.array() });
  }
  try {
    const mobilidad = await Mobilidad.create(req.body);
    logger.info("Mobilidad creada")
    res.status(201).json(mobilidad);
  } catch (error) {
    logger.error('Error al crear mobilidad: ', error);
    res.status(500).json({ error: 'Failed to create mobilidad' });
  }
};

export const updateMobilidad = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al actualizar mobilidad: ', errors);
      res.status(400).json({ errors: errors.array() });
  }
  try {
    const { candidato_id } = req.params;
    const [updated] = await Mobilidad.update(req.body, { where: { candidato_id } });
    if (updated) {
      const updatedMobilidad = await Mobilidad.findByPk(candidato_id);
        logger.info("Mobilidad actualizada")
      res.status(200).json(updatedMobilidad);
    } else {
        logger.error(`Mobilidad con candidato_id: ${candidato_id} no encontrada.`)
      res.status(404).json({ error: 'Mobilidad not found' });
    }
  } catch (error) {
    logger.error('Error al actualizar mobilidad: ', error);
    res.status(500).json({ error: 'Failed to update mobilidad' });
  }
};

export const deleteMobilidad = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al eliminar mobilidad: ', errors)
      res.status(400).json({ errors: errors.array() });
  }
  try {
    const { candidato_id } = req.params;
    const deleted = await Mobilidad.destroy({ where: { candidato_id } });
    if (deleted) {
        logger.info(`Mobilidad con candidato_id: ${candidato_id} eliminada.`)
      res.status(204).send();
    } else {
        logger.error(`Mobilidad con candidato_id: ${candidato_id} no encontrada.`)
      res.status(404).json({ error: 'Mobilidad not found' });
    }
  } catch (error) {
    logger.error('Error al eliminar mobilidad: ', error);
    res.status(500).json({ error: 'Failed to delete mobilidad' });
  }
};