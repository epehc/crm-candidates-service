import { Request, Response } from 'express';
import Candidato from '../../src/models/candidato';
import { getCandidatos, getCandidatoByCandidatoId, updateCandidato } from '../../src/controllers/candidatoController';
import { validationResult } from 'express-validator';

jest.mock('../../src/models/candidato');
jest.mock('express-validator', () => ({
    validationResult: jest.fn(() => ({
        isEmpty: () => true,
        array: () => []
    }))
}));

const mockResponse = {
    json: jest.fn(),
    status: jest.fn(() => mockResponse),
    send: jest.fn(),
} as unknown as Response;

beforeEach(() => {
    jest.clearAllMocks();
});

describe('getCandidatos', () => {
    test('should return all candidatos successfully', async () => {
        // Remove duplicate spy so that findAndCountAll returns an object with the expected shape.
        const fakeCandidates = [{ candidato_id: '1', nombre: 'Test Candidate' }];
        jest.spyOn(Candidato, 'findAndCountAll').mockResolvedValue({ count: 1, rows: fakeCandidates } as any);

        const req = {
            query: { page: '1', pageSize: '12', query: 'Test' }
        } as unknown as Request;

        await getCandidatos(req, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(
            expect.objectContaining({
                data: fakeCandidates,
                total: 1,
                totalPages: 1,
                currentPage: 1,
            })
        );
    });

    test('should return 400 if validation fails', async () => {
        (validationResult as unknown as jest.Mock).mockReturnValueOnce({
            isEmpty: () => false,
            array: () => [{ msg: 'Invalid input' }]
        });

        const req = { query: {} } as unknown as Request;
        await getCandidatos(req, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ errors: [{ msg: 'Invalid input' }] });
    });
});

describe('getCandidatoByCandidatoId', () => {
    test('should return the candidato when found', async () => {
        const fakeCandidato = { candidato_id: '123', nombre: 'Test Candidate' };

        // Return a plain object with a toJSON method for proper serialization.
        jest.spyOn(Candidato, 'findByPk').mockResolvedValue(
            { ...fakeCandidato, toJSON: () => fakeCandidato } as any
        );

        const req = { params: { candidato_id: '123' } } as unknown as Request;
        await getCandidatoByCandidatoId(req, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            candidato: expect.objectContaining({
                candidato_id: '123',
                nombre: 'Test Candidate'
            })
        });
    });

    test('should return 404 if candidato is not found', async () => {
        jest.spyOn(Candidato, 'findByPk').mockResolvedValue(null);

        const req = { params: { candidato_id: '123' } } as unknown as Request;
        await getCandidatoByCandidatoId(req, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Candidato not found' });
    });
});

describe('updateCandidato', () => {
    test('should update candidato and return updated candidato', async () => {
        const updatedCandidate = { candidato_id: '123', nombre: 'Updated Candidate' };

        // First, simulate a successful update.
        jest.spyOn(Candidato, 'update').mockResolvedValue([1]);
        // Then, return a plain object with a toJSON method.
        jest.spyOn(Candidato, 'findByPk').mockResolvedValue(
            { ...updatedCandidate, toJSON: () => updatedCandidate } as any
        );

        const req = { params: { candidato_id: '123' }, body: { nombre: 'Updated Candidate' } } as unknown as Request;
        await updateCandidato(req, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            updatedCandidato: expect.objectContaining({
                candidato_id: '123',
                nombre: 'Updated Candidate'
            })
        });
    });

    test('should return 404 if no candidato is updated', async () => {
        jest.spyOn(Candidato, 'update').mockResolvedValue([0]);

        const req = { params: { candidato_id: '123' }, body: { nombre: 'Candidate' } } as unknown as Request;
        await updateCandidato(req, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Candidato not found' });
    });
});