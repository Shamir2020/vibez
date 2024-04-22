const supertest = require('supertest')
const app = require('./index.js')


describe("POST /api/user", ()=>{

    describe("given a username and password", ()=>{

        test("POST", async ()=>{
            const response = await request(app).post('/api/user/login').send({
                username: 'labib24',
                password: '123456789'
            })

            expect(response, statusCode).toBe(200)
        })
    })
})