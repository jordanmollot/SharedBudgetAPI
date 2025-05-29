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

    describe('POST /budgets', () => {
        it("should send 200 if a budget is created", async () => {
            const email = 'user1@mail.com';
            const password = 'password1';
            const user1 = {
                email,
                password
            };

            const userCreated = await request(app)
                .post('/auth/signup')
                .send(user1);
            
            const budgetTitle = 'test budget';
            const userId = userCreated.body._id;
            // console.log(userId);
            const budget = {
                budgetTitle,
                userId
            };
            // await Budget.insertMany(budget);
    //         // console.log(budget);

            const response = await request(app)
                .post('/budgets')
                .send(budget);
            expect(response.statusCode).toEqual(200);

    //         // const budgetTest = await Budget.find();
    //         // expect(budgetTest).toHaveLength(1);

    //         // const res = await request(server).post("/items").send(item0);
    //         // expect(res.statusCode).toEqual(401);
        });

        // it ("should return 400 if budget title is not included", async () => {
        //     const title = '';
        //     const userId = '6835f73fb681397b8a40d425';
        //     const budget = {
        //         title,
        //         userId
        //     };
        //     await Budget.insertMany(budget);

        //     const response = await request(app)
        //         .post('/budgets')
        //         .send(budget);
        //     expect(response.statusCode).toEqual(400);
        // });
    });
});