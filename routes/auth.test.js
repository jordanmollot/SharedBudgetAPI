const request = require("supertest");
const app = require('../app');
// const server = require("../server");

const testUtils = require("../test-utils");

const User = require("../models/user");
const Budget = require("../models/budget");
const Transaction = require("../models/transaction");
const Category = require("../models/category");

describe('budgets routes', () => {
    beforeAll(testUtils.connectDB);  
    afterEach(testUtils.clearDB);
    afterAll(testUtils.stopDB);

    describe('POST /auth/signup', () => {
        it("should send 200 if a user is created", async () => {
            const email = 'user1@mail.com';
            const password = 'password1';
            const user1 = {
                email,
                password
            };
            // await Budget.insertMany(budget);

            const response = await request(app)
                .post('/auth/signup')
                .send(user1);
            expect(response.statusCode).toEqual(200);
        });
    });

    describe('POST /auth/login', () => {
        it("should send 200 if a user is logged in", async () => {
            const email = 'user1@mail.com';
            const password = 'password1';
            const user1 = {
                email,
                password
            };
            // await Budget.insertMany(budget);

           await request(app)
                .post('/auth/signup')
                .send(user1);
                // .post('/auth/login')
                // .send(user1);
            // expect(response.statusCode).toEqual(200);

            const response = await request(app)
                .post('/auth/login')
                .send(user1);
            expect(response.statusCode).toEqual(200);            
        });
    });

    describe('PUT /auth/password', () => {
        it("should send 200 if a user's password is changed", async () => {
            const email = 'user1@mail.com';
            const password = 'password1';
            // const _id = '6835f73fb681397b8a40d424';
            let token1;
            const user1 = {
                email,
                password
                // _id
            };
            const newPassword = {
                password: 'passwordUpdated'
            };


           await request(app)
                .post('/auth/signup')
                .send(user1);

            const login = await request(app)
                .post('/auth/login')
                .send(user1);
            token1 = login.body.token
            // console.log(token1);

            // const authHeader = ('Bearer ' + token1);
            // console.log(authHeader);
            
            const response = await request(app)
                .put('/auth/password')
                .set("Authorization", "Bearer " + token1)
                .send(newPassword);
                // console.log(token1);
                // console.log(newPassword);
            expect(response.statusCode).toEqual(200);            
        });
    });
});