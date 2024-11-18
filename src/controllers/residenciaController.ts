// controllers/residenciaController.ts
import { Request, Response } from 'express';
import Residencia from '../models/residencia';
import {validationResult} from "express-validator";

export const getAllResidencias = async (req: Request, res: Response) => {
  try {
    const residencias = await Residencia.findAll();
    res.json(residencias);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch residencias' });
  }
};

export const getResidenciaByCandidatoId = async (req: Request, res: Response) => {
  try {
    const { candidato_id } = req.params;
    const residencia = await Residencia.findByPk(candidato_id);
    if (residencia) {
      res.json(residencia);
    } else {
      res.status(404).json({ error: 'Residencia not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch residencia' });
  }
};

export const createResidencia = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const residencia = await Residencia.create(req.body);
    res.status(201).json(residencia);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create residencia' });
  }
};

export const updateResidencia = async (req: Request, res: Response) => {
  try {
    const { candidato_id } = req.params;
    const [updated] = await Residencia.update(req.body, { where: { candidato_id } });
    if (updated) {
      const updatedResidencia = await Residencia.findByPk(candidato_id);
      res.json(updatedResidencia);
    } else {
      res.status(404).json({ error: 'Residencia not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update residencia' });
  }
};

export const deleteResidencia = async (req: Request, res: Response) => {
  try {
    const { candidato_id } = req.params;
    const deleted = await Residencia.destroy({ where: { candidato_id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Residencia not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete residencia' });
  }
};