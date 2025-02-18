jest.mock('../../node_modules/@epehc/sharedutilities/middlewares/authMiddleware', () => ({
  authenticateJWT: (req: any, res: any, next: any) => next()
}));
jest.mock('../../node_modules/@epehc/sharedutilities/middlewares/authorize', () => ({
  authorize: () => (req: any, res: any, next: any) => next()
}));


import * as residenciaController from "../../src/controllers/residenciaController";

// Stub controller functions for getResidenciaByCandidatoId and updateResidencia
jest
  .spyOn(residenciaController, "getResidenciaByCandidatoId")
  .mockImplementation(async (req, res) => {
    const { candidato_id } = req.params;
    if (candidato_id === "22222222-2222-2222-2222-222222222222") {
      const residencia = {
        candidato_id,
        vive_con: "Familia",
        calle: "Principal",
        zona: "5",
        municipio: "Ciudad",
        departamento: "Departamento",
        pais_de_residencia: "Country",
      };
      res.status(200).json(residencia);
    } else {
      res.status(404).json({ error: "Residencia not found" });
    }
  });

jest
  .spyOn(residenciaController, "updateResidencia")
  .mockImplementation(async (req, res) => {
    const { candidato_id } = req.params;
    if (candidato_id === "22222222-2222-2222-2222-222222222222") {
      const updatedResidencia = { candidato_id, ...req.body };
      res.status(200).json(updatedResidencia);
    } else {
      res.status(404).json({ error: "Residencia not found" });
    }
  });

import request from "supertest";
import express from "express";
import residenciaRoutes from "../../src/routes/residenciaRoutes";


const app = express();
app.use(express.json());
app.use("/residencias", residenciaRoutes);

describe("Residencia Routes Integration Tests", () => {
  test("GET /residencias/:candidato_id should return residencia when found", async () => {
    const validId = "22222222-2222-2222-2222-222222222222";
    const res = await request(app).get(`/residencias/${validId}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      candidato_id: validId,
      vive_con: "Familia",
      calle: "Principal",
      zona: "5",
      municipio: "Ciudad",
      departamento: "Departamento",
      pais_de_residencia: "Country",
    });
  });

  test("PUT /residencias/:candidato_id should update residencia when found", async () => {
    const validId = "22222222-2222-2222-2222-222222222222";
    const updateData = {
      calle: "Secundaria",
      zona: "10",
    };
    const res = await request(app)
      .put(`/residencias/${validId}`)
      .send(updateData);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ candidato_id: validId, ...updateData });
  });
});
