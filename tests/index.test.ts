// index.test.ts
import startServer from '../src/index';
import request from 'supertest';
describe('Pokemon tests', () => {
    let app: any;

    beforeAll(async () => {
        app = await startServer();
    });

    afterAll(async () => {
        await app.close();
    });
    
    it('responds with 200 and "Hello, Pokemon!" at /', async () => {
        const response = await request(app).get('/api/pokemon');
        expect(response.status).toBe(200);
    });

    // Add more tests for your routes and middleware here
});