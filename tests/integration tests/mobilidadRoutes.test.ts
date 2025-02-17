jest.mock('@epehc/sharedutilities/middlewares/authMiddleware', () => ({
  authenticateJWT: (req: any, res: any, next: any) => next()
}));
jest.mock('@epehc/sharedutilities/middlewares/authorize', () => ({
  authorize: () => (req: any, res: any, next: any) => next()
}));

import * as mobilidadController from "../../src/controllers/mobilidadController";

// Stub controller functions for getMobilidadByCandidatoId and updateMobilidad
jest
  .spyOn(mobilidadController, "getMobilidadByCandidatoId")
  .mockImplementation(async (req, res) => {
    const { candidato_id } = req.params;
    if (candidato_id === "11111111-1111-1111-1111-111111111111") {
      const mobilida = {
        candidato_id,
        licencia: "B",
        licencia_tipo: "Automóvil",
        licencia_fecha_expiracion: "2025-12-31",
        tiempo_conduciendo: "5 años",
        vehiculo: "Sí",
        vehiculo_tipo: "Sedán",
        vehiculo_modelo: "2020",
        viaje_interior: "Sí",
        viaje_exterior: "No",
      };
      res.status(200).json(mobilida);
    } else {
      res.status(404).json({ error: "Mobilidad not found" });
    }
  });

jest
  .spyOn(mobilidadController, "updateMobilidad")
  .mockImplementation(async (req, res) => {
    const { candidato_id } = req.params;
    if (candidato_id === "11111111-1111-1111-1111-111111111111") {
      const updatedMobilidad = { candidato_id, ...req.body };
      res.status(200).json(updatedMobilidad);
    } else {
      res.status(404).json({ error: "Mobilidad not found" });
    }
  });

import request from "supertest";
import express from "express";
import mobilidadRoutes from "../../src/routes/mobilidadRoutes";


const app = express();
app.use(express.json());
app.use("/mobilidades", mobilidadRoutes);

describe("Mobilidad Routes Integration Tests", () => {
  test("GET /mobilidades/:candidato_id should return movilidad when found", async () => {
    const validId = "11111111-1111-1111-1111-111111111111";
    const res = await request(app).get(`/mobilidades/${validId}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      candidato_id: validId,
      licencia: "B",
      licencia_tipo: "Automóvil",
      licencia_fecha_expiracion: "2025-12-31",
      tiempo_conduciendo: "5 años",
      vehiculo: "Sí",
      vehiculo_tipo: "Sedán",
      vehiculo_modelo: "2020",
      viaje_interior: "Sí",
      viaje_exterior: "No",
    });
  });

  test("PUT /mobilidades/:candidato_id should update movilidad when found", async () => {
    const validId = "11111111-1111-1111-1111-111111111111";
    const updateData = {
      tiempo_conduciendo: "6 años",
      vehiculo_tipo: "SUV",
      vehiculo_modelo: "2021",
    };
    const res = await request(app)
      .put(`/mobilidades/${validId}`)
      .send(updateData);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ candidato_id: validId, ...updateData });
  });
});
