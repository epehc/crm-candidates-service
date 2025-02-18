jest.mock('../../node_modules/@epehc/sharedutilities/middlewares/authMiddleware', () => ({
  authenticateJWT: (req: any, res: any, next: any) => next()
}));
jest.mock('../../node_modules/@epehc/sharedutilities/middlewares/authorize', () => ({
  authorize: () => (req: any, res: any, next: any) => next()
}));

import * as candidatoController from "../../src/controllers/candidatoController";

// Stub controller functions to simulate responses
jest
  .spyOn(candidatoController, "getCandidatos")
  .mockImplementation(async (req, res) => {
    res.status(200).json([{ candidato_id: "test", nombre: "Test Candidate" }]);
  });
jest
  .spyOn(candidatoController, "getCandidatoByCandidatoId")
  .mockImplementation(async (req, res) => {
    if (req.params.candidato_id === "1") {
      res.status(200).json({ candidato_id: "1", nombre: "Found Candidate" });
    } else {
      res.status(404).json({ error: "Candidato not found" });
    }
  });
jest
  .spyOn(candidatoController, "updateCandidato")
  .mockImplementation(async (req, res) => {
    if (req.params.candidato_id === "1") {
      res.status(200).json({ candidato_id: "1", ...req.body });
    } else {
      res.status(404).json({ error: "Candidato not found" });
    }
  });

import request from "supertest";
import express from "express";
import candidatoRoutes from "../../src/routes/candidatoRoutes";


// Create Express app and mount routes
const app = express();
app.use(express.json());
app.use("/candidatos", candidatoRoutes);

describe("Candidato Routes Integration Tests", () => {
  test("GET /candidatos should return a list of candidatos", async () => {
    const res = await request(app).get("/candidatos");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      { candidato_id: "test", nombre: "Test Candidate" },
    ]);
  });

  test("GET /candidatos/1 should return a candidato when found", async () => {
    const res = await request(app).get("/candidatos/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ candidato_id: "1", nombre: "Found Candidate" });
  });

  test("GET /candidatos/999 should return 404 when not found", async () => {
    const res = await request(app).get("/candidatos/999");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Candidato not found" });
  });

  test("PUT /candidatos/1 should update a candidato when found", async () => {
    const updateData = { nombre: "Updated Candidate" };
    const res = await request(app).put("/candidatos/1").send(updateData);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ candidato_id: "1", ...updateData });
  });

  test("PUT /candidatos/999 should return 404 when candidato is not found", async () => {
    const res = await request(app)
      .put("/candidatos/999")
      .send({ nombre: "Updated Candidate" });
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Candidato not found" });
  });
});
