jest.mock('../../node_modules/@epehc/sharedutilities/middlewares/authMiddleware', () => ({
  authenticateJWT: (req: any, res: any, next: any) => next()
}));
jest.mock('../../node_modules/@epehc/sharedutilities/middlewares/authorize', () => ({
  authorize: () => (req: any, res: any, next: any) => next()
}));


import * as experienciaLaboralController from "../../src/controllers/experienciaLaboralController";
// Stub getExperienciasLaboralesByCandidatoId to simulate multiple work experiences per candidate
jest
  .spyOn(experienciaLaboralController, "getExperienciasLaboralesByCandidatoId")
  .mockImplementation(async (req, res) => {
    if (req.params.candidato_id === "321") {
      res.status(200).json([
        { id: "x", candidato_id: "321", empresa: "Company X" },
        { id: "y", candidato_id: "321", empresa: "Company Y" },
      ]);
    } else {
      res.status(404).json({ error: "Experiencias laborales not found" });
    }
  });

import request from "supertest";
import express from "express";
import experienciaLaboralRoutes from "../../src/routes/experienciaLaboralRoutes";


const app = express();
app.use(express.json());
app.use("/experiencias-laborales", experienciaLaboralRoutes);

describe("Experiencias Laborales Routes - GET by candidato_id", () => {
  test("GET /experiencias-laborales/candidato/321 should return an array of experiencias laborales", async () => {
    const res = await request(app).get("/experiencias-laborales/candidato/321");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      { id: "x", candidato_id: "321", empresa: "Company X" },
      { id: "y", candidato_id: "321", empresa: "Company Y" },
    ]);
  });

  test("GET /experiencias-laborales/candidato/111 should return 404 when no experiencias laborales found", async () => {
    const res = await request(app).get("/experiencias-laborales/candidato/111");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Experiencias laborales not found" });
  });
});
