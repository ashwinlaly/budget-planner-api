let request = require('supertest'),
    db = require('./db');

/* Life cycle */
// Before all the test case executes
beforeEach(() => {
    console.log(db)
})

// Executes all test case executes After 
afterEach(() => {
    
})

test('Get / request', async () => {
    await request('http://localhost:5000/').get('/').send().expect(404)
})

test('Get All Budgets List', async() => {
    await request('http://localhost:5000/').get('budgets').send().expect(201)
})