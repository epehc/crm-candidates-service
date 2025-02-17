import { Request, Response } from 'express';
import { getEstudiosByCandidatoId, updateEstudio } from '../../src/controllers/estudioController';
import Estudio from '../../src/models/estudio';
import { validationResult } from 'express-validator';

jest.mock('../../src/models/estudio');
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

describe('getEstudiosByCandidatoId', () => {
    test('should return estudios for the given candidato_id', async () => {
        const fakeEstudios = [{ id: '1', candidato_id: '456', institucion: 'Universidad XYZ', titulo: 'Ingenieria', grado: 'Licenciatura' }];
        (Estudio.findAll as jest.Mock).mockResolvedValue(fakeEstudios);
        
        const req = { params: { candidato_id: '456' } } as unknown as Request;
        await getEstudiosByCandidatoId(req, mockResponse);
        
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(fakeEstudios);
    });
});

describe('updateEstudio', () => {
    test('should update estudio and return updated estudio', async () => {
    const updatedEstudio = {
        id: '123',
        institucion: 'Universidad ABC',
        titulo: 'Ingenieria Civil',
        grado: 'Licenciatura',
        toJSON: () => ({ id: '123', institucion: 'Universidad ABC', titulo: 'Ingenieria Civil', grado: 'Licenciatura' })
    };
    
    (Estudio.update as jest.Mock).mockResolvedValue([1]);
    (Estudio.findByPk as jest.Mock).mockResolvedValue(updatedEstudio);
    
    const req = {
        params: { id: '123' },
        body: { institucion: 'Universidad ABC', titulo: 'Ingenieria Civil', grado: 'Licenciatura' }
    } as unknown as Request;
    await updateEstudio(req, mockResponse);
    
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(updatedEstudio);
});

    test('should return 404 if estudio is not found for update', async () => {
    (Estudio.update as jest.Mock).mockResolvedValue([0]);
    
    const req = {
        params: { id: '123' },
        body: { institucion: 'Universidad ABC', titulo: 'Ingenieria Civil', grado: 'Licenciatura' }
    } as unknown as Request;
    await updateEstudio(req, mockResponse);
    
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Estudio not found' });
    });
});