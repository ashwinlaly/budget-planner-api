test('Simple Test', () => {
    expect(1).toBe(1)
})

test('Simple test 2', () => {
    expect(2).toBe(2)
})

test('Simple test 3', (done) => {
    setTimeout(() => {
        expect(1).toBe(1)
        done()
    }, 5000)
})

test('Simple API test', () => {
    fetch('https://reqres.in/api/users/2')
        .then(res => res.json())
        .then(data => console.log(data))
})