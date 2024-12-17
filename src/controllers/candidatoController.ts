import { Request, Response } from 'express';
import Candidato from '../models/candidato';
import {validationResult} from "express-validator";
import logger from "../utils/logger";

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