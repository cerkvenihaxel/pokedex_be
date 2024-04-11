import supertest from 'supertest';
import startServer from '../src/index'; 

const api = supertest(startServer);


// Unit tests for endpoints responses 
describe('Greeting message', () => {
    test('It should respond with a greeting message', async () => {
      const response = await api.get('/status');
      expect(response.status).toBe(200);
    }); // Increased timeout to 10 seconds
  });

  describe('Pokemon list', () => {
    test('It should respond with a list of Pokemon', async () => {
      const response = await api.get('/api/pokemon/list');
      expect(response.status).toBe(200);
      expect(response.body).not.toBeNull();
      expect(response.body.length).toBeGreaterThan(0);
    });
  
    test('It should respond with a list of Pokemon based on the provided query parameters', async () => {
      const response = await api.get('/api/pokemon/list?name=ivysaur');
      expect(response.status).toBe(200);
      expect(response.body).not.toBeNull();
      expect(response.body.length).toBeGreaterThan(0);
    });
  
    test('It should respond with a list of Pokemon based on the provided query parameters', async () => {
      const response = await api.get('/api/pokemon/list?type=grass');
      expect(response.status).toBe(200);
      expect(response.body).not.toBeNull();
      expect(response.body.length).toBeGreaterThan(0);
    });
  
    test('It should respond with a list of Pokemon based on the provided query parameters', async () => {
      const response = await api.get('/api/pokemon/list?offset=0&limit=3');
      expect(response.status).toBe(200);
      expect(response.body).not.toBeNull();
      expect(response.body.length).toBe(3);
    });
  });

  describe('Pokemon by name', () => {
    test('It should respond with a Pokemon object based on the provided name', async () => {
      const response = await api.get('/api/pokemon/name/ivysaur');
      expect(response.status).toBe(200);
      expect(response.body).not.toBeNull();
      expect(response.body.name).toBe('ivysaur');
    });
  });

describe('Pokemon by ID', () => { 
    test('It should respond with a Pokemon object based on the provided ID', async () => {
        const response = await api.get('/api/pokemon/25');
        expect(response.status).toBe(200);
        expect(response.body).not.toBeNull();
        expect(response.body.name).toBe('pikachu');
    });
});
