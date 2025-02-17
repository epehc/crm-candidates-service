import { Request, Response } from 'express';
import { getViciosByCandidatoId, updateVicios } from '../../src/controllers/viciosController';
import Vicios from '../../src/models/vicios';
import { validationResult } from 'express-validator';

jest.mock('../../src/models/vicios');
jest.mock('express-validator', () => ({
  validationResult: jest.fn(() => ({
    isEmpty: () => true,
    array: () => []
  }))
}));

const mockResponse: Response = {
  json: jest.fn(),
  status: jest.fn(() => mockResponse),
  send: jest.fn(),
} as unknown as Response;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('getViciosByCandidatoId', () => {
  test('should return vicios when found', async () => {
    const fakeVicios = {
      candidato_id: 'd5fE_asz',
      fuma: 'No',
      alcohol: 'Si',
      alcohol_frecuencia: 'Ocasionalmente',
      drogas: 'No',
      tatuajes: 'Si',
      toJSON: () => ({
        candidato_id: 'd5fE_asz',
        fuma: 'No',
        alcohol: 'Si',
        alcohol_frecuencia: 'Ocasionalmente',
        drogas: 'No',
        tatuajes: 'Si'
      })
    };
    (Vicios.findByPk as jest.Mock).mockResolvedValue(fakeVicios);

    const req = { params: { candidato_id: 'd5fE_asz' } } as unknown as Request;
    await getViciosByCandidatoId(req, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(fakeVicios);
  });

  test('should return 404 when vicios not found', async () => {
    (Vicios.findByPk as jest.Mock).mockResolvedValue(null);

    const req = { params: { candidato_id: 'd5fE_asz' } } as unknown as Request;
    await getViciosByCandidatoId(req, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Vicios not found' });
  });
});

describe('updateVicios', () => {
  test('should update vicios and return updated vicios', async () => {
    const updatedVicios = {
      candidato_id: 'd5fE_asz',
      fuma: 'Si',
      alcohol: 'No',
      alcohol_frecuencia: 'Nunca',
      drogas: 'No',
      tatuajes: 'No',
      toJSON: () => ({
        candidato_id: 'd5fE_asz',
        fuma: 'Si',
        alcohol: 'No',
        alcohol_frecuencia: 'Nunca',
        drogas: 'No',
        tatuajes: 'No'
      })
    };

    (Vicios.update as jest.Mock).mockResolvedValue([1]);
    (Vicios.findByPk as jest.Mock).mockResolvedValue(updatedVicios);

    const req = {
      params: { candidato_id: 'd5fE_asz' },
      body: {
        fuma: 'Si',
        alcohol: 'No',
        alcohol_frecuencia: 'Nunca',
        drogas: 'No',
        tatuajes: 'No'
      }
    } as unknown as Request;

    await updateVicios(req, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(updatedVicios);
  });

  test('should return 404 if vicios is not updated', async () => {
    (Vicios.update as jest.Mock).mockResolvedValue([0]);

    const req = {
      params: { candidato_id: 'd5fE_asz' },
      body: {
        fuma: 'Si',
        alcohol: 'No',
        alcohol_frecuencia: 'Nunca',
        drogas: 'No',
        tatuajes: 'No'
      }
    } as unknown as Request;

    await updateVicios(req, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Vicios not found' });
  });
});