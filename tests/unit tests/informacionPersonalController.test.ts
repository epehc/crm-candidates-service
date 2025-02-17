import { Response } from 'express';
import { getInformacionPersonalByCandidatoId, updateInformacionPersonal } from '../../src/controllers/informacionPersonalController';
import InformacionPersonal from '../../src/models/informacionPersonal';
import { validationResult } from 'express-validator';

jest.mock('../../src/models/informacionPersonal');
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

describe('getInformacionPersonalByCandidatoId', () => {
    test('should return informacion personal when found', async () => {
    const fakeInfo = {
        candidato_id: '123',
        dpi: '1234567890123',
        nacionalidad: 'Guatemalteco',
        estado_civil: 'Soltero',
        religion: 'Catolico',
        software: 'Microsoft Office',
        partido_politico: 'Ninguno',
        sindicato: 'Ninguno',
        adjetivos: 'Responsable, Puntual',
        impedimento_fisico: 'Ninguno',
        enfermedad: 'Ninguna',
        nivel_estudios: 'Universitario',
        estudios_adicionales: 'Curso de Ingles',
        idiomas: 'Espanol, Ingles',
        personas_dependientes: '2',
        fecha_nacimiento: '1990-01-01',
        edad: '33',
        toJSON: () => fakeInfo,
    };
    (InformacionPersonal.findByPk as jest.Mock).mockResolvedValue(fakeInfo);

    const req = { params: { candidato_id: '123' } } as any;
    await getInformacionPersonalByCandidatoId(req, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(fakeInfo);
    });

    test('should return 404 when informacion personal is not found', async () => {
    (InformacionPersonal.findByPk as jest.Mock).mockResolvedValue(null);

    const req = { params: { candidato_id: '123' } } as any;
    await getInformacionPersonalByCandidatoId(req, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Informacion personal not found' });
    });
});

describe('updateInformacionPersonal', () => {
    test('should update informacion personal and return updated info', async () => {
    const updatedInfo = {
        candidato_id: '123',
        dpi: '1234567890123',
        nacionalidad: 'Guatemalteco',
        estado_civil: 'Soltero',
        religion: 'Catolico',
        software: 'Microsoft Office',
        partido_politico: 'Ninguno',
        sindicato: 'Ninguno',
        adjetivos: 'Responsable, Puntual',
        impedimento_fisico: 'Ninguno',
        enfermedad: 'Ninguna',
        nivel_estudios: 'Universitario',
        estudios_adicionales: 'Curso de Ingles',
        idiomas: 'Espanol, Ingles',
        personas_dependientes: '2',
        fecha_nacimiento: '1990-01-01',
        edad: '33',
        toJSON: () => updatedInfo,
    };

    (InformacionPersonal.update as jest.Mock).mockResolvedValue([1]);
    (InformacionPersonal.findByPk as jest.Mock).mockResolvedValue(updatedInfo);

    const req = {
        params: { candidato_id: '123' },
            body: {
                dpi: '1234567890123',
                nacionalidad: 'Guatemalteco',
                estado_civil: 'Soltero',
                religion: 'Catolico',
                software: 'Microsoft Office',
                partido_politico: 'Ninguno',
                sindicato: 'Ninguno',
                adjetivos: 'Responsable, Puntual',
                impedimento_fisico: 'Ninguno',
                enfermedad: 'Ninguna',
                nivel_estudios: 'Universitario',
                estudios_adicionales: 'Curso de Ingles',
                idiomas: 'Espanol, Ingles',
                personas_dependientes: '2',
                fecha_nacimiento: '1990-01-01',
                edad: '33'
        }
    } as any;

    await updateInformacionPersonal(req, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(updatedInfo);
    });

    test('should return 404 when update does not affect any record', async () => {
    (InformacionPersonal.update as jest.Mock).mockResolvedValue([0]);

    const req = {
        params: { candidato_id: '123' },
      body: { dpi: '1234567890123' } // sample update data
    } as any;

    await updateInformacionPersonal(req, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Informacion personal not found' });
    });
});