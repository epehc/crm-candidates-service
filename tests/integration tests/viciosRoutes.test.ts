jest.mock('../../node_modules/@epehc/sharedutilities/middlewares/authMiddleware', () => ({
  authenticateJWT: (req: any, res: any, next: any) => next()
}));
jest.mock('../../node_modules/@epehc/sharedutilities/middlewares/authorize', () => ({
  authorize: () => (req: any, res: any, next: any) => next()
}));

import * as viciosController from "../../src/controllers/viciosController";

// Stub controller functions
jest
  .spyOn(viciosController, "getViciosByCandidatoId")
  .mockImplementation(async (req: any, res: any) => {
    if (req.params.candidato_id === "d5fE_asz") {
      res.status(200).json({
        candidato_id: "d5fE_asz",
        fuma: "No",
        alcohol: "Si",
        alcohol_frecuencia: "Ocasionalmente",
        drogas: "No",
        tatuajes: "Si",
      });
    } else {
      res.status(404).json({ error: "Vicios not found" });
    }
  });

jest
  .spyOn(viciosController, "updateVicios")
  .mockImplementation(async (req: any, res: any) => {
    if (req.params.candidato_id === "d5fE_asz") {
      const updatedVicios = {
        candidato_id: req.params.candidato_id,
        ...req.body,
      };
      res.status(200).json(updatedVicios);
    } else {
      res.status(404).json({ error: "Vicios not found" });
    }
  });
import request from "supertest";
import express from "express";
import viciosRoutes from "../../src/routes/viciosRoutes";


// Create a test Express app and mount the routes.
const app = express();
app.use(express.json());
app.use("/vicios", viciosRoutes);

describe("Vicios Routes Integration Tests", () => {
  test("GET /vicios/:candidato_id should return vicios when found", async () => {
    const res = await request(app).get("/vicios/d5fE_asz");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      candidato_id: "d5fE_asz",
      fuma: "No",
      alcohol: "Si",
      alcohol_frecuencia: "Ocasionalmente",
      drogas: "No",
      tatuajes: "Si",
    });
  });

  test("PUT /vicios/:candidato_id should update vicios and return updated vicios", async () => {
    const updateData = {
      fuma: "Si",
      alcohol: "No",
      alcohol_frecuencia: "Nunca",
      drogas: "No",
      tatuajes: "No",
    };
    const res = await request(app).put("/vicios/d5fE_asz").send(updateData);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      candidato_id: "d5fE_asz",
      ...updateData,
    });
  });
});
