// controllers/candidatoController.ts
import { Request, Response } from 'express';
import Candidato from '../models/candidato';

export const getAllCandidatos = async (req: Request, res: Response) => {
  try {
    const candidatos = await Candidato.findAll();
    res.json(candidatos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch candidatos' });
  }
};

export const getCandidatoByCandidatoId = async (req: Request, res: Response) => {
  try {
    const { candidato_id } = req.params;
    const candidato = await Candidato.findByPk(candidato_id);
    if (candidato) {
      res.json(candidato);
    } else {
      res.status(404).json({ error: 'Candidato not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch candidato' });
  }
};

export const getCandidatoByEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;
        const candidato = await Candidato.findOne({ where: { email } });
        if (candidato) {
            res.json(candidato);
        } else {
            res.status(404).json({ error: 'Candidato not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch candidato' });
    }
};

export const getCandidatoByDPI = async (req: Request, res: Response) => {
    try {
        const { dpi } = req.params;
        const candidato = await Candidato.findOne({ where: { dpi } });
        if (candidato) {
            res.json(candidato);
        } else {
            res.status(404).json({ error: 'Candidato not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch candidato' });
    }
};

export const createCandidato = async (req: Request, res: Response) => {
  try {
    const candidato = await Candidato.create(req.body);
    res.status(201).json(candidato);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create candidato' });
  }
};

export const updateCandidato = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [updated] = await Candidato.update(req.body, { where: { id } });
    if (updated) {
      const updatedCandidato = await Candidato.findByPk(id);
      res.json(updatedCandidato);
    } else {
      res.status(404).json({ error: 'Candidato not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update candidato' });
  }
};

export const deleteCandidato = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Candidato.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Candidato not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete candidato' });
  }
};