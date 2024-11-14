// controllers/viciosController.ts
import { Request, Response } from 'express';
import Vicios from '../models/vicios';

export const getAllVicios = async (req: Request, res: Response) => {
  try {
    const vicios = await Vicios.findAll();
    res.json(vicios);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vicios' });
  }
};

export const getViciosByCandidatoId = async (req: Request, res: Response) => {
  try {
    const { candidato_id } = req.params;
    const vicios = await Vicios.findByPk(candidato_id);
    if (vicios) {
      res.json(vicios);
    } else {
      res.status(404).json({ error: 'Vicios not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vicios' });
  }
};

export const createVicios = async (req: Request, res: Response) => {
  try {
    const vicios = await Vicios.create(req.body);
    res.status(201).json(vicios);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create vicios' });
  }
};

export const updateVicios = async (req: Request, res: Response) => {
  try {
    const { candidato_id } = req.params;
    const [updated] = await Vicios.update(req.body, { where: { candidato_id } });
    if (updated) {
      const updatedVicios = await Vicios.findByPk(candidato_id);
      res.json(updatedVicios);
    } else {
      res.status(404).json({ error: 'Vicios not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update vicios' });
  }
};

export const deleteVicios = async (req: Request, res: Response) => {
  try {
    const { candidato_id } = req.params;
    const deleted = await Vicios.destroy({ where: { candidato_id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Vicios not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete vicios' });
  }
};