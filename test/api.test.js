let request = require('supertest');

test('Simple API test', async() => {
    await request('http://localhost:5000/').get('budgets').send().expect(201)
})