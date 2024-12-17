// controllers/experienciaLaboralController.ts
import { Request, Response } from 'express';
import ExperienciaLaboral from '../models/experienciaLaboral';
import {validationResult} from "express-validator";
import logger from "../utils/logger";

export const getAllExperienciasLaborales = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al cargar experiencias laborales: ', errors);
      res.status(400).json({ errors: errors.array() });
  }
  try {
    const experienciasLaborales = await ExperienciaLaboral.findAll();
    logger.info("Experiencias laborales cargadas")
    res.status(200).json(experienciasLaborales);
  } catch (error) {
    logger.error('Error al cargar experiencias laborales: ', error);
    res.status(500).json({ error: 'Failed to fetch experiencias laborales' });
  }
};

export const getExperienciaLaboralById = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al cargar experiencia laboral: ', errors);
      res.status(400).json({ errors: errors.array() });
  }
  try {
    const { id } = req.params;
    const experienciaLaboral = await ExperienciaLaboral.findByPk(id);
    if (experienciaLaboral) {
        logger.info(`Experiencia laboral con id: ${id} cargada.`)
      res.status(200).json(experienciaLaboral);
    } else {
        logger.error(`Experiencia laboral con id: ${id} no encontrada.`)
      res.status(404).json({ error: 'Experiencia laboral not found' });
    }
  } catch (error) {
    logger.error('Error al cargar experiencia laboral: ', error);
    res.status(500).json({ error: 'Failed to fetch experiencia laboral' });
  }
};

export const getExperienciasLaboralesByCandidatoId = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al cargar experiencias laborales: ', errors);
      res.status(400).json({ errors: errors.array() });
  }
  try {
        const { candidato_id } = req.params;
        const experienciasLaborales = await ExperienciaLaboral.findAll({ where: { candidato_id } });
        logger.info(`Experiencias laborales del candidato con candidato_id: ${candidato_id} cargadas.`)
        res.status(200).json(experienciasLaborales);
    } catch (error) {
    logger.error('Error al cargar experiencias laborales: ', error);
        res.status(500).json({ error: 'Failed to fetch experiencias laborales' });
    }
};

export const createExperienciaLaboral = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al crear experiencia laboral: ', errors);
    res.status(400).json({ errors: errors.array() });
  }
  try {
    const experienciaLaboral = await ExperienciaLaboral.create(req.body);
    logger.info("Experiencia laboral creada")
    res.status(201).json(experienciaLaboral);
  } catch (error) {
    logger.error('Error al crear experiencia laboral: ', error);
    res.status(500).json({ error: 'Failed to create experiencia laboral' });
  }
};

export const updateExperienciaLaboral = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al actualizar experiencia laboral: ', errors);
      res.status(400).json({ errors: errors.array() });
  }
  try {
    const { id } = req.params;
    const [updated] = await ExperienciaLaboral.update(req.body, { where: { id } });
    if (updated) {
      const updatedExperienciaLaboral = await ExperienciaLaboral.findByPk(id);
        logger.info("Experiencia laboral actualizada")
      res.status(200).json(updatedExperienciaLaboral);
    } else {
        logger.error(`Experiencia laboral con id: ${id} no encontrada.`)
      res.status(404).json({ error: 'Experiencia laboral not found' });
    }
  } catch (error) {
    logger.error('Error al actualizar experiencia laboral: ', error);
    res.status(500).json({ error: 'Failed to update experiencia laboral' });
  }
};

export const deleteExperienciaLaboral = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Error al eliminar experiencia laboral: ', errors);
      res.status(400).json({ errors: errors.array() });
  }
  try {
    const { id } = req.params;
    const deleted = await ExperienciaLaboral.destroy({ where: { id } });
    if (deleted) {
        logger.info(`Experiencia laboral con id: ${id} eliminada.`)
      res.status(204).send();
    } else {
        logger.error(`Experiencia laboral con id: ${id} no encontrada.`)
      res.status(404).json({ error: 'Experiencia laboral not found' });
    }
  } catch (error) {
    logger.error('Error al eliminar experiencia laboral: ', error);
    res.status(500).json({ error: 'Failed to delete experiencia laboral' });
  }
};