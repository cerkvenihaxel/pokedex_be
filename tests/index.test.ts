// index.test.ts
import supertest from 'supertest';
import startServer from '../src/index';

const api = supertest(startServer);
describe('GET /api/pokemon', () => {
    it('should return a greeting message', async () => {
        const res = await api.get('/api/pokemon');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toBeInstanceOf(String);
    });
});