import { Request, Response } from 'express';
import { getContactosByCandidatoId, updateContacto } from '../../src/controllers/contactoController';
import Contacto from '../../src/models/contacto';
import { validationResult } from 'express-validator';

jest.mock('../../src/models/contacto');
jest.mock('express-validator', () => ({
    validationResult: jest.fn(() => ({
        isEmpty: () => true,
        array: () => [],
    })),
}));

const mockResponse: Response = {
    json: jest.fn(),
    status: jest.fn(() => mockResponse),
    send: jest.fn(),
} as unknown as Response;

beforeEach(() => {
    jest.clearAllMocks();
});

describe('getContactosByCandidatoId', () => {
    test('should return contactos for the given candidato_id', async () => {
        const fakeContactos = [{ id: '1', candidato_id: '456', nombre: 'Contacto X' }];
        (Contacto.findAll as jest.Mock).mockResolvedValue(fakeContactos);

        const req = { params: { candidato_id: '456' } } as unknown as Request;
        await getContactosByCandidatoId(req, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(fakeContactos);
    });
});

describe('updateContacto', () => {
    test('should update contacto and return updated contacto', async () => {
    const updatedContacto = {
        id: '123',
        nombre: 'Updated Contact',
        toJSON: () => ({ id: '123', nombre: 'Updated Contact' }),
    };

    (Contacto.update as jest.Mock).mockResolvedValue([1]);
    (Contacto.findByPk as jest.Mock).mockResolvedValue(updatedContacto);

    const req = {
        params: { id: '123' },
        body: { nombre: 'Updated Contact' }
    } as unknown as Request;

    await updateContacto(req, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(updatedContacto);
});

    test('should return 404 if no contacto is updated', async () => {
        (Contacto.update as jest.Mock).mockResolvedValue([0]);

        const req = {
            params: { id: '123' },
            body: { nombre: 'Updated Contact' }
        } as unknown as Request;

    await updateContacto(req, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Contacto not found' });
    });
});