// controllers/residenciaController.ts
import { Request, Response } from 'express';
import Residencia from '../models/residencia';
import {validationResult} from "express-validator";
import logger from "../utils/logger";

export const getAllResidencias = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al cargar residencias: ', errors);
      res.status(400).json({ errors: errors.array() });
  }
  try {
    const residencias = await Residencia.findAll();
    logger.info("Residencias cargadas")
    res.status(200).json(residencias);
  } catch (error) {
    logger.error('Error al cargar residencias: ', error);
    res.status(500).json({ error: 'Failed to fetch residencias' });
  }
};

export const getResidenciaByCandidatoId = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al cargar residencia: ', errors);
      res.status(400).json({ errors: errors.array() });
  }
  try {
    const { candidato_id } = req.params;
    const residencia = await Residencia.findByPk(candidato_id);
    if (residencia) {
        logger.info(`Residencia con candidato_id: ${candidato_id} cargada.`)
      res.status(200).json(residencia);
    } else {
        logger.error(`Residencia con candidato_id: ${candidato_id} no encontrada.`)
      res.status(404).json({ error: 'Residencia not found' });
    }
  } catch (error) {
    logger.error('Error al cargar residencia: ', error);
    res.status(500).json({ error: 'Failed to fetch residencia' });
  }
};

export const createResidencia = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al crear residencia: ', errors);
    res.status(400).json({ errors: errors.array() });
  }
  try {
    const residencia = await Residencia.create(req.body);
    logger.info("Residencia creada")
    res.status(201).json(residencia);
  } catch (error) {
    logger.error('Error al crear residencia: ', error);
    res.status(500).json({ error: 'Failed to create residencia' });
  }
};

export const updateResidencia = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al actualizar residencia: ', errors);
      res.status(400).json({ errors: errors.array() });
  }
  try {
    const { candidato_id } = req.params;
    const [updated] = await Residencia.update(req.body, { where: { candidato_id } });
    if (updated) {
      const updatedResidencia = await Residencia.findByPk(candidato_id);
        logger.info("Residencia actualizada")
      res.status(200).json(updatedResidencia);
    } else {
        logger.error(`Residencia con candidato_id: ${candidato_id} no encontrada.`)
      res.status(404).json({ error: 'Residencia not found' });
    }
  } catch (error) {
    logger.error('Error al actualizar residencia: ', error);
    res.status(500).json({ error: 'Failed to update residencia' });
  }
};

export const deleteResidencia = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al eliminar residencia: ', errors);
      res.status(400).json({ errors: errors.array() });
  }
  try {
    const { candidato_id } = req.params;
    const deleted = await Residencia.destroy({ where: { candidato_id } });
    if (deleted) {
        logger.info(`Residencia con candidato_id: ${candidato_id} eliminada.`)
      res.status(204).send();
    } else {
        logger.error(`Residencia con candidato_id: ${candidato_id} no encontrada.`)
      res.status(404).json({ error: 'Residencia not found' });
    }
  } catch (error) {
    logger.error('Error al eliminar residencia: ', error);
    res.status(500).json({ error: 'Failed to delete residencia' });
  }
};