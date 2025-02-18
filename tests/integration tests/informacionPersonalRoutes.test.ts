jest.mock('../../node_modules/@epehc/sharedutilities/middlewares/authMiddleware', () => ({
  authenticateJWT: (req: any, res: any, next: any) => next()
}));
jest.mock('../../node_modules/@epehc/sharedutilities/middlewares/authorize', () => ({
  authorize: () => (req: any, res: any, next: any) => next()
}));


import * as informacionPersonalController from "../../src/controllers/informacionPersonalController";

// Stub controller functions for getInformacionPersonalByCandidatoId and updateInformacionPersonal
jest
  .spyOn(informacionPersonalController, "getInformacionPersonalByCandidatoId")
  .mockImplementation(async (req, res) => {
    const { candidato_id } = req.params;
    if (candidato_id === "123e4567-e89b-12d3-a456-426614174000") {
      const infoPersonal = {
        candidato_id,
        dpi: "1234567890123",
        nacionalidad: "Guatemalteco",
        estado_civil: "Soltero",
        religion: "Catolico",
        software: "Microsoft Office",
        partido_politico: "Ninguno",
        sindicato: "Ninguno",
        adjetivos: "Responsable, Puntual",
        impedimento_fisico: "Ninguno",
        enfermedad: "Ninguna",
        nivel_estudios: "Universitario",
        estudios_adicionales: "Curso de Ingles",
        idiomas: "Español, Inglés",
        personas_dependientes: "2",
        fecha_nacimiento: "1990-01-01",
        edad: "33",
      };
      res.status(200).json(infoPersonal);
    } else {
      res.status(404).json({ error: "Informacion personal not found" });
    }
  });

jest
  .spyOn(informacionPersonalController, "updateInformacionPersonal")
  .mockImplementation(async (req, res) => {
    const { candidato_id } = req.params;
    if (candidato_id === "123e4567-e89b-12d3-a456-426614174000") {
      const updatedInfo = { candidato_id, ...req.body };
      res.status(200).json(updatedInfo);
    } else {
      res.status(404).json({ error: "Informacion personal not found" });
    }
  });

import request from "supertest";
import express from "express";
import informacionPersonalRoutes from "../../src/routes/informacionPersonalRoutes";


const app = express();
app.use(express.json());
app.use("/informaciones-personales", informacionPersonalRoutes);

describe("Informacion Personal Routes Integration Tests", () => {
  test("GET /informaciones-personales/:candidato_id should return informacion personal when found", async () => {
    const validId = "123e4567-e89b-12d3-a456-426614174000";
    const res = await request(app).get(`/informaciones-personales/${validId}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      candidato_id: validId,
      dpi: "1234567890123",
      nacionalidad: "Guatemalteco",
      estado_civil: "Soltero",
      religion: "Catolico",
      software: "Microsoft Office",
      partido_politico: "Ninguno",
      sindicato: "Ninguno",
      adjetivos: "Responsable, Puntual",
      impedimento_fisico: "Ninguno",
      enfermedad: "Ninguna",
      nivel_estudios: "Universitario",
      estudios_adicionales: "Curso de Ingles",
      idiomas: "Español, Inglés",
      personas_dependientes: "2",
      fecha_nacimiento: "1990-01-01",
      edad: "33",
    });
  });

  test("PUT /informaciones-personales/:candidato_id should update informacion personal when found", async () => {
    const validId = "123e4567-e89b-12d3-a456-426614174000";
    const updateData = {
      dpi: "9876543210987",
      nacionalidad: "Guatemalteco",
      estado_civil: "Casado",
    };
    const res = await request(app)
      .put(`/informaciones-personales/${validId}`)
      .send(updateData);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ candidato_id: validId, ...updateData });
  });
});
