import { Request, Response } from 'express';
import { getResidenciaByCandidatoId, updateResidencia } from '../../src/controllers/residenciaController';
import Residencia from '../../src/models/residencia';
import { validationResult } from 'express-validator';

jest.mock('../../src/models/residencia');
jest.mock('express-validator', () => ({
  validationResult: jest.fn(() => ({
    isEmpty: () => true,
    array: () => []
  }))
}));

const mockResponse: Response = {
  json: jest.fn(),
  status: jest.fn(() => mockResponse),
  send: jest.fn()
} as unknown as Response;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('getResidenciaByCandidatoId', () => {
  test('should return residencia when found', async () => {
    const fakeResidencia = {
      candidato_id: 'd5fE_asz',
      vive_con: 'Familia',
      calle: '5ta Avenida',
      zona: '10',
      municipio: 'Guatemala',
      departamento: 'Guatemala',
      pais_de_residencia: 'Guatemala',
      toJSON: () => ({
        candidato_id: 'd5fE_asz',
        vive_con: 'Familia',
        calle: '5ta Avenida',
        zona: '10',
        municipio: 'Guatemala',
        departamento: 'Guatemala',
        pais_de_residencia: 'Guatemala'
      })
    };

    (Residencia.findByPk as jest.Mock).mockResolvedValue(fakeResidencia);

    const req = { params: { candidato_id: 'd5fE_asz' } } as unknown as Request;
    await getResidenciaByCandidatoId(req, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(fakeResidencia);
  });

  test('should return 404 when residencia is not found', async () => {
    (Residencia.findByPk as jest.Mock).mockResolvedValue(null);

    const req = { params: { candidato_id: 'd5fE_asz' } } as unknown as Request;
    await getResidenciaByCandidatoId(req, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Residencia not found' });
  });
});

describe('updateResidencia', () => {
  test('should update residencia and return updated residencia', async () => {
    const updatedResidencia = {
      candidato_id: 'd5fE_asz',
      vive_con: 'Familia',
      calle: 'Nueva Calle',
      zona: '12',
      municipio: 'Guatemala',
      departamento: 'Guatemala',
      pais_de_residencia: 'Guatemala',
      toJSON: () => ({
        candidato_id: 'd5fE_asz',
        vive_con: 'Familia',
        calle: 'Nueva Calle',
        zona: '12',
        municipio: 'Guatemala',
        departamento: 'Guatemala',
        pais_de_residencia: 'Guatemala'
      })
    };

    (Residencia.update as jest.Mock).mockResolvedValue([1]);
    (Residencia.findByPk as jest.Mock).mockResolvedValue(updatedResidencia);

    const req = {
      params: { candidato_id: 'd5fE_asz' },
      body: { calle: 'Nueva Calle', zona: '12' }
    } as unknown as Request;

    await updateResidencia(req, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(updatedResidencia);
  });

  test('should return 404 when update does not affect any record', async () => {
    (Residencia.update as jest.Mock).mockResolvedValue([0]);

    const req = {
      params: { candidato_id: 'd5fE_asz' },
      body: { calle: 'Nueva Calle', zona: '12' }
    } as unknown as Request;

    await updateResidencia(req, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Residencia not found' });
  });
});