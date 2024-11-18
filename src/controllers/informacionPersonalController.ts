// controllers/informacionPersonalController.ts
import { Request, Response } from 'express';
import InformacionPersonal from '../models/informacionPersonal';
import {validationResult} from "express-validator";

export const getAllInformacionesPersonales = async (req: Request, res: Response) => {
  try {
    const informacionesPersonales = await InformacionPersonal.findAll();
    res.json(informacionesPersonales);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch informaciones personales' });
  }
};

export const getInformacionPersonalByCandidatoId = async (req: Request, res: Response) => {
  try {
    const { candidato_id } = req.params;
    const informacionPersonal = await InformacionPersonal.findByPk(candidato_id);
    if (informacionPersonal) {
      res.json(informacionPersonal);
    } else {
      res.status(404).json({ error: 'Informacion personal not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch informacion personal' });
  }
};

export const createInformacionPersonal = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const informacionPersonal = await InformacionPersonal.create(req.body);
    res.status(201).json(informacionPersonal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create informacion personal' });
  }
};

export const updateInformacionPersonal = async (req: Request, res: Response) => {
  try {
    const { candidato_id } = req.params;
    const [updated] = await InformacionPersonal.update(req.body, { where: { candidato_id } });
    if (updated) {
      const updatedInformacionPersonal = await InformacionPersonal.findByPk(candidato_id);
      res.json(updatedInformacionPersonal);
    } else {
      res.status(404).json({ error: 'Informacion personal not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update informacion personal' });
  }
};

export const deleteInformacionPersonal = async (req: Request, res: Response) => {
  try {
    const { candidato_id } = req.params;
    const deleted = await InformacionPersonal.destroy({ where: { candidato_id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Informacion personal not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete informacion personal' });
  }
};