// controllers/contactoController.ts
import { Request, Response } from 'express';
import Contacto from '../models/contacto';
import {validationResult} from "express-validator";

export const getAllContactos = async (req: Request, res: Response) => {
  try {
    const contactos = await Contacto.findAll();
    res.json(contactos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contactos' });
  }
};

export const getContactoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contacto = await Contacto.findByPk(id);
    if (contacto) {
      res.json(contacto);
    } else {
      res.status(404).json({ error: 'Contacto not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacto' });
  }
};

export const getContactosByCandidatoId = async (req: Request, res: Response) => {
    try {
        const { candidato_id } = req.params;
        const contactos = await Contacto.findAll({ where: { candidato_id } });
        res.json(contactos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch contactos' });
    }
};

export const createContacto = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const contacto = await Contacto.create(req.body);
    res.status(201).json(contacto);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create contacto' });
  }
};

export const updateContacto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [updated] = await Contacto.update(req.body, { where: { id } });
    if (updated) {
      const updatedContacto = await Contacto.findByPk(id);
      res.json(updatedContacto);
    } else {
      res.status(404).json({ error: 'Contacto not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contacto' });
  }
};

export const deleteContacto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Contacto.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Contacto not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contacto' });
  }
};