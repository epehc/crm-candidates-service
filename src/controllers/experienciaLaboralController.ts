// controllers/experienciaLaboralController.ts
import { Request, Response } from 'express';
import ExperienciaLaboral from '../models/experienciaLaboral';

export const getAllExperienciasLaborales = async (req: Request, res: Response) => {
  try {
    const experienciasLaborales = await ExperienciaLaboral.findAll();
    res.json(experienciasLaborales);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch experiencias laborales' });
  }
};

export const getExperienciaLaboralById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const experienciaLaboral = await ExperienciaLaboral.findByPk(id);
    if (experienciaLaboral) {
      res.json(experienciaLaboral);
    } else {
      res.status(404).json({ error: 'Experiencia laboral not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch experiencia laboral' });
  }
};

export const getExperienciasLaboralesByCandidatoId = async (req: Request, res: Response) => {
    try {
        const { candidato_id } = req.params;
        const experienciasLaborales = await ExperienciaLaboral.findAll({ where: { candidato_id } });
        res.json(experienciasLaborales);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch experiencias laborales' });
    }
};

export const createExperienciaLaboral = async (req: Request, res: Response) => {
  try {
    const experienciaLaboral = await ExperienciaLaboral.create(req.body);
    res.status(201).json(experienciaLaboral);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create experiencia laboral' });
  }
};

export const updateExperienciaLaboral = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [updated] = await ExperienciaLaboral.update(req.body, { where: { id } });
    if (updated) {
      const updatedExperienciaLaboral = await ExperienciaLaboral.findByPk(id);
      res.json(updatedExperienciaLaboral);
    } else {
      res.status(404).json({ error: 'Experiencia laboral not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update experiencia laboral' });
  }
};

export const deleteExperienciaLaboral = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await ExperienciaLaboral.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Experiencia laboral not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete experiencia laboral' });
  }
};