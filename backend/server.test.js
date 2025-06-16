const request = require('supertest');
const express = require('express');

// Mock OpenAI
const mockCreate = jest.fn();
jest.mock('openai', () => {
  return jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: mockCreate
      }
    }
  }));
});

const app = require('./server');

describe('Server', () => {
  beforeEach(() => {
    mockCreate.mockReset();
  });

  describe('Health Check', () => {
    it('should respond to health check', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ status: 'ok' });
    });
  });

  describe('Code Review Endpoint', () => {
    it('should successfully review code', async () => {
      mockCreate.mockResolvedValueOnce({
        choices: [{
          message: {
            content: 'Mock code review response'
          }
        }]
      });

      const testCode = 'const x = 1;';
      const testLanguage = 'javascript';
      
      const response = await request(app)
        .post('/api/review')
        .send({ code: testCode, language: testLanguage });
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('review');
      expect(response.body.review).toBe('Mock code review response');
    });

    it('should handle missing code', async () => {
      const response = await request(app)
        .post('/api/review')
        .send({ language: 'javascript' });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should handle missing language', async () => {
      const response = await request(app)
        .post('/api/review')
        .send({ code: 'const x = 1;' });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should handle empty code', async () => {
      const response = await request(app)
        .post('/api/review')
        .send({ code: '', language: 'javascript' });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should handle OpenAI API errors', async () => {
      mockCreate.mockRejectedValueOnce(new Error('API Error'));

      const response = await request(app)
        .post('/api/review')
        .send({ code: 'const x = 1;', language: 'javascript' });
      
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Failed to generate code review');
    });
  });
}); 