// controllers/viciosController.ts
import { Request, Response } from 'express';
import Vicios from '../models/vicios';
import {validationResult} from "express-validator";
import logger from "../utils/logger";

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