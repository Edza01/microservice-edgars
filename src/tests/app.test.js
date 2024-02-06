const request = require('supertest');
const app = require('../../src/app');

describe('GET /products/search/:query', () => {
    let server;     

    beforeAll(done => {
        server = app.listen(3000, done);
    });

    afterAll(done => {
        server.close(done);
    });

    it('should return status 200 and JSON response', async () => {
        const response = await request(app).get('/products/search/phone');
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
    });

    it('should return products matching the search query', async () => {
        const response = await request(app).get('/products/search/phone');
        expect(response.body).toHaveProperty('products');
        expect(response.body.products.length).toBeGreaterThan(0);
    });

    it('should return paginated products when query parameters are provided', async () => {
        const response = await request(app).get('/products/search/phone?limit=2&page=1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('products');
        expect(response.body.products.length).toBe(2);
    });

    it('should return products in the specified format (JSON)', async () => {
        const response = await request(app).get('/products/search/phone');
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty('products');
    });
});
