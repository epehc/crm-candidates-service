jest.mock('../../node_modules/@epehc/sharedutilities/middlewares/authMiddleware', () => ({
  authenticateJWT: (req: any, res: any, next: any) => next()
}));
jest.mock('../../node_modules/@epehc/sharedutilities/middlewares/authorize', () => ({
  authorize: () => (req: any, res: any, next: any) => next()
}));

import * as contactoController from "../../src/controllers/contactoController";

// Stub getContactosByCandidatoId to simulate multiple contacts
jest
  .spyOn(contactoController, "getContactosByCandidatoId")
  .mockImplementation(async (req, res) => {
    if (req.params.candidato_id === "456") {
      res.status(200).json([
        { id: "1", candidato_id: "456", nombre: "Contacto One" },
        { id: "2", candidato_id: "456", nombre: "Contacto Two" },
      ]);
    } else {
      res.status(404).json({ error: "Contactos not found" });
    }
    
  });

import request from "supertest";
import express from "express";
import contactoRoutes from "../../src/routes/contactoRoutes";

const app = express();
app.use(express.json());
app.use("/contactos", contactoRoutes);

describe("Contactos Routes - GET by candidato_id", () => {
  test("GET /contactos/candidato/456 should return an array of contactos", async () => {
    const res = await request(app).get("/contactos/candidato/456");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      { id: "1", candidato_id: "456", nombre: "Contacto One" },
      { id: "2", candidato_id: "456", nombre: "Contacto Two" },
    ]);
  });

  test("GET /contactos/candidato/999 should return 404 when no contactos found", async () => {
    const res = await request(app).get("/contactos/candidato/999");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Contactos not found" });
  });
});
