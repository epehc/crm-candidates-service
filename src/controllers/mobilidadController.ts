// controllers/mobilidadController.ts
import { Request, Response } from 'express';
import Mobilidad from '../models/mobilidad';
import {validationResult} from "express-validator";

export const getAllMobilidades = async (req: Request, res: Response) => {
  try {
    const mobilidades = await Mobilidad.findAll();
    res.json(mobilidades);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch mobilidades' });
  }
};

export const getMobilidadByCandidatoId = async (req: Request, res: Response) => {
  try {
    const { candidato_id } = req.params;
    const movilidad = await Mobilidad.findByPk(candidato_id);
    if (movilidad) {
      res.json(movilidad);
    } else {
      res.status(404).json({ error: 'Mobilidad not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movilidad' });
  }
};

export const createMobilidad = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const movilidad = await Mobilidad.create(req.body);
    res.status(201).json(movilidad);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create movilidad' });
  }
};

export const updateMobilidad = async (req: Request, res: Response) => {
  try {
    const { candidato_id } = req.params;
    const [updated] = await Mobilidad.update(req.body, { where: { candidato_id } });
    if (updated) {
      const updatedMobilidad = await Mobilidad.findByPk(candidato_id);
      res.json(updatedMobilidad);
    } else {
      res.status(404).json({ error: 'Mobilidad not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update movilidad' });
  }
};

export const deleteMobilidad = async (req: Request, res: Response) => {
  try {
    const { candidato_id } = req.params;
    const deleted = await Mobilidad.destroy({ where: { candidato_id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Mobilidad not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete movilidad' });
  }
};