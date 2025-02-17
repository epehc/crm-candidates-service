import { Request, Response } from 'express';
import { getExperienciasLaboralesByCandidatoId, updateExperienciaLaboral } from '../../src/controllers/experienciaLaboralController';
import ExperienciaLaboral from '../../src/models/experienciaLaboral';
import { validationResult } from 'express-validator';

jest.mock('../../src/models/experienciaLaboral');
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

describe('getExperienciasLaboralesByCandidatoId', () => {
    test('should return experiencias laborales for the given candidato_id', async () => {
    const fakeExperiencias = [
        {
        id: '1',
        candidato_id: '456',
        empresa: 'Company XYZ',
        puesto: 'Developer',
        fecha_inicio: '2020-01-01',
        fecha_fin: '2021-01-01'
        }
    ];
    (ExperienciaLaboral.findAll as jest.Mock).mockResolvedValue(fakeExperiencias);
    
    const req = { params: { candidato_id: '456' } } as unknown as Request;
    await getExperienciasLaboralesByCandidatoId(req, mockResponse);
    
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(fakeExperiencias);
    });
});

describe('updateExperienciaLaboral', () => {
    test('should update experiencia laboral and return updated experiencia laboral', async () => {
    const updatedExperiencia = {
        id: '123',
        empresa: 'Company ABC',
        puesto: 'Senior Developer',
        fecha_inicio: '2019-01-01',
        fecha_fin: '2020-01-01',
        toJSON: () => ({
            id: '123',
            empresa: 'Company ABC',
            puesto: 'Senior Developer',
            fecha_inicio: '2019-01-01',
            fecha_fin: '2020-01-01'
        })
    };
    
    (ExperienciaLaboral.update as jest.Mock).mockResolvedValue([1]);
    (ExperienciaLaboral.findByPk as jest.Mock).mockResolvedValue(updatedExperiencia);
    
    const req = {
        params: { id: '123' },
        body: { empresa: 'Company ABC', puesto: 'Senior Developer', fecha_inicio: '2019-01-01', fecha_fin: '2020-01-01' }
    } as unknown as Request;
    
    await updateExperienciaLaboral(req, mockResponse);
    
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(updatedExperiencia);
    });

    test('should return 404 if no experiencia laboral is updated', async () => {
    (ExperienciaLaboral.update as jest.Mock).mockResolvedValue([0]);
    
    const req = {
        params: { id: '123' },
        body: { empresa: 'Company ABC', puesto: 'Senior Developer', fecha_inicio: '2019-01-01', fecha_fin: '2020-01-01' }
    } as unknown as Request;
    
    await updateExperienciaLaboral(req, mockResponse);
    
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Experiencia laboral not found' });
    });
});