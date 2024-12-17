// controllers/estudioController.ts
import { Request, Response } from 'express';
import Estudio from '../models/estudio';
import {validationResult} from "express-validator";
import logger from "../utils/logger";

export const getAllEstudios = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al cargar estudios: ', errors);
    res.status(400).json({ errors: errors.array() });
  }
  try {
    const estudios = await Estudio.findAll();
    logger.info("Estudios cargados")
    res.status(200).json(estudios);
  } catch (error) {
    logger.error('Error al cargar estudios: ', error);
    res.status(500).json({ error: 'Failed to fetch estudios' });
  }
};

export const getEstudioById = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al cargar estudio: ', errors);
    res.status(400).json({ errors: errors.array() });
  }
  try {
    const { id } = req.params;
    const estudio = await Estudio.findByPk(id);
    if (estudio) {
      logger.info(`Estudio con id: ${id} cargado.`)
      res.status(200).json(estudio);
    } else {
      logger.error(`Estudio con id: ${id} no encontrado.`)
      res.status(404).json({ error: 'Estudio not found' });
    }
  } catch (error) {
    logger.error('Error al cargar estudio: ', error);
    res.status(500).json({ error: 'Failed to fetch estudio' });
  }
};

export const getEstudiosByCandidatoId = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al cargar estudios: ', errors);
      res.status(400).json({ errors: errors.array() });
  }
  try {
    const { candidato_id } = req.params;
    const estudios = await Estudio.findAll({ where: { candidato_id } });
    logger.info(`Estudios del candidato con candidato_id: ${candidato_id} cargados.`)
    res.status(200).json(estudios);
  } catch (error) {
    logger.error('Error al cargar estudios: ', error);
    res.status(500).json({ error: 'Failed to fetch estudios' });
  }
};

export const createEstudio = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al crear estudio: ', errors);
     res.status(400).json({ errors: errors.array() });
  }
  try {
    const estudio = await Estudio.create(req.body);
    logger.info("Estudio creado")
    res.status(201).json(estudio);
  } catch (error) {
    logger.error('Error al crear estudio: ', error);
    res.status(500).json({ error: 'Failed to create estudio' });
  }
};

export const updateEstudio = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al actualizar estudio: ', errors);
      res.status(400).json({ errors: errors.array() });
  }
  try {
    const { id } = req.params;
    const [updated] = await Estudio.update(req.body, { where: { id } });
    if (updated) {
      const updatedEstudio = await Estudio.findByPk(id);
      logger.info("Estudio actualizado")
      res.status(200).json(updatedEstudio);
    } else {
        logger.error(`Estudio con id: ${id} no encontrado.`)
      res.status(404).json({ error: 'Estudio not found' });
    }
  } catch (error) {
    logger.error('Error al actualizar estudio: ', error);
    res.status(500).json({ error: 'Failed to update estudio' });
  }
};

export const deleteEstudio = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al eliminar estudio: ', errors);
      res.status(400).json({ errors: errors.array() });
  }
  try {
    const { id } = req.params;
    const deleted = await Estudio.destroy({ where: { id } });
    if (deleted) {
        logger.info("Estudio eliminado")
      res.status(204).send();
    } else {
        logger.error(`Estudio con id: ${id} no encontrado.`)
      res.status(404).json({ error: 'Estudio not found' });
    }
  } catch (error) {
    logger.error('Error al eliminar estudio: ', error);
    res.status(500).json({ error: 'Failed to delete estudio' });
  }
};