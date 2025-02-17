jest.mock('@epehc/sharedutilities/middlewares/authMiddleware', () => ({
  authenticateJWT: (req: any, res: any, next: any) => next()
}));
jest.mock('@epehc/sharedutilities/middlewares/authorize', () => ({
  authorize: () => (req: any, res: any, next: any) => next()
}));

import * as estudioController from "../../src/controllers/estudioController";

// Stub getEstudiosByCandidatoId to simulate multiple estudios per candidate
jest
  .spyOn(estudioController, "getEstudiosByCandidatoId")
  .mockImplementation(async (req, res) => {
    if (req.params.candidato_id === "789") {
      res.status(200).json([
        { id: "a", candidato_id: "789", institucion: "Uni A" },
        { id: "b", candidato_id: "789", institucion: "Uni B" },
      ]);
    } else {
      res.status(404).json({ error: "Estudios not found" });
    }
  });
  
import request from "supertest";
import express from "express";
import estudioRoutes from "../../src/routes/estudioRoutes";


const app = express();
app.use(express.json());
app.use("/estudios", estudioRoutes);

describe("Estudios Routes - GET by candidato_id", () => {
  test("GET /estudios/candidato/789 should return an array of estudios", async () => {
    const res = await request(app).get("/estudios/candidato/789");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      { id: "a", candidato_id: "789", institucion: "Uni A" },
      { id: "b", candidato_id: "789", institucion: "Uni B" },
    ]);
  });

  test("GET /estudios/candidato/000 should return 404 when no estudios found", async () => {
    const res = await request(app).get("/estudios/candidato/000");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Estudios not found" });
  });
});
