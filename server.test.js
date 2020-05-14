const request = require('supertest')
const app = require('./server')

describe('Get Welcome Text', () => {
    it('get the root endpoint text', async done => {
        const res = await request(app).get('/')
        expect(res.statusCode).toEqual(200)
        expect(res.text).toEqual('Hello!')
        done()
    })
})

afterAll(() => {
    app.close();
});