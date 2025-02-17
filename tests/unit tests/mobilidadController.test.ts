import { Request, Response } from 'express';
import { getMobilidadByCandidatoId, updateMobilidad } from '../../src/controllers/mobilidadController';
import Mobilidad from '../../src/models/mobilidad';
import { validationResult } from 'express-validator';

jest.mock('../../src/models/mobilidad');
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

describe('getMobilidadByCandidatoId', () => {
    test('should return movilidad when found', async () => {
    const fakeMobilidad = {
        candidato_id: '123',
        licencia: 'B',
        licencia_tipo: 'Automovil',
        licencia_fecha_expiracion: '2025-12-31',
        tiempo_conduciendo: '5 años',
        vehiculo: 'Si',
        vehiculo_tipo: 'Sedan',
        vehiculo_modelo: '2020',
        viaje_interior: 'Si',
        viaje_exterior: 'No',
    };
    (Mobilidad.findByPk as jest.Mock).mockResolvedValue(fakeMobilidad);
    
    const req = { params: { candidato_id: '123' } } as unknown as Request;
    await getMobilidadByCandidatoId(req, mockResponse);
    
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(fakeMobilidad);
    });

    test('should return 404 when movilidad is not found', async () => {
    (Mobilidad.findByPk as jest.Mock).mockResolvedValue(null);
    
    const req = { params: { candidato_id: '123' } } as unknown as Request;
    await getMobilidadByCandidatoId(req, mockResponse);
    
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Mobilidad not found' });
    });
});

describe('updateMobilidad', () => {
    test('should update movilidad and return updated movilidad', async () => {
    const updatedMobilidad = {
        candidato_id: '123',
        licencia: 'B',
        licencia_tipo: 'Automovil',
        licencia_fecha_expiracion: '2025-12-31',
        tiempo_conduciendo: '6 años',
        vehiculo: 'Si',
        vehiculo_tipo: 'SUV',
        vehiculo_modelo: '2021',
        viaje_interior: 'Si',
        viaje_exterior: 'No',
        toJSON: () => ({
            candidato_id: '123',
            licencia: 'B',
            licencia_tipo: 'Automovil',
            licencia_fecha_expiracion: '2025-12-31',
            tiempo_conduciendo: '6 años',
            vehiculo: 'Si',
            vehiculo_tipo: 'SUV',
            vehiculo_modelo: '2021',
            viaje_interior: 'Si',
            viaje_exterior: 'No',
        })
    };
    
    (Mobilidad.update as jest.Mock).mockResolvedValue([1]);
    (Mobilidad.findByPk as jest.Mock).mockResolvedValue(updatedMobilidad);
    
    const req = {
        params: { candidato_id: '123' },
        body: {
        tiempo_conduciendo: '6 años',
        vehiculo_tipo: 'SUV',
        vehiculo_modelo: '2021'
        }
    } as unknown as Request;
    
    await updateMobilidad(req, mockResponse);
    
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(updatedMobilidad);
    });

    test('should return 404 if no movilidad is updated', async () => {
    (Mobilidad.update as jest.Mock).mockResolvedValue([0]);
    
    const req = {
        params: { candidato_id: '123' },
        body: {
        tiempo_conduciendo: '6 años',
        vehiculo_tipo: 'SUV',
        vehiculo_modelo: '2021'
        }
    } as unknown as Request;
    
    await updateMobilidad(req, mockResponse);
    
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Mobilidad not found' });
    });
});