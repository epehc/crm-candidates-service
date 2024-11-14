// controllers/estudioController.ts
import { Request, Response } from 'express';
import Estudio from '../models/estudio';

export const getAllEstudios = async (req: Request, res: Response) => {
  try {
    const estudios = await Estudio.findAll();
    res.json(estudios);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch estudios' });
  }
};

export const getEstudioById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const estudio = await Estudio.findByPk(id);
    if (estudio) {
      res.json(estudio);
    } else {
      res.status(404).json({ error: 'Estudio not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch estudio' });
  }
};

export const getEstudiosByCandidatoId = async (req: Request, res: Response) => {
  try {
    const { candidato_id } = req.params;
    const estudios = await Estudio.findAll({ where: { candidato_id } });
    res.json(estudios);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch estudios' });
  }
};

export const createEstudio = async (req: Request, res: Response) => {
  try {
    const estudio = await Estudio.create(req.body);
    res.status(201).json(estudio);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create estudio' });
  }
};

export const updateEstudio = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [updated] = await Estudio.update(req.body, { where: { id } });
    if (updated) {
      const updatedEstudio = await Estudio.findByPk(id);
      res.json(updatedEstudio);
    } else {
      res.status(404).json({ error: 'Estudio not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update estudio' });
  }
};

export const deleteEstudio = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Estudio.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Estudio not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete estudio' });
  }
};