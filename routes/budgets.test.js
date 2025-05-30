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

    describe('GET /budgets/:id', () => {
        it("should send 200 if the specified budget its details are returned", async () => {
            const email = 'user1@mail.com';
            const password = 'password1';
            let token1;
            const user1 = {
                email,
                password
            };

           const userCreated = await request(app)
                .post('/auth/signup')
                .send(user1);

            const login = await request(app)
                .post('/auth/login')
                .send(user1);
            token1 = login.body.token

            const budgetTitle = 'test budget';
            const userId = userCreated.body._id;
            const budget = {
                budgetTitle,
                userId
            };

            const createdBudget = await request(app)
                .post('/budgets')
                .send(budget);

            const title = 'test category';
            const incOrExp = 'income';
            const newCategory = {
                title,
                incOrExp
            };

            const createdCategory = await request(app)
                .post('/categories')
                .send(newCategory);

            const description = 'test transaction';
            const amount = 5;
            const categoryId = createdCategory.body._id;
            const budgetId = createdBudget.body._id;
            const transaction = {
                description,
                amount,
                categoryId,
                budgetId,
            };

            await request(app)
                .post('/transactions')
                .set('Authorization', 'Bearer ' + token1)
                .send(transaction);

            // const returnTransaction = createdTransaction.body._id;
            // console.log(returnTransaction);

            const response = await request(app)
                .get('/budgets/' + budgetId)
                .set('Authorization', 'Bearer ' + token1)
                .send();
            expect(response.statusCode).toEqual(200);
        });
    });

    describe('GET /budgets/:id/filter', () => {
        it("should send 200 if the specified budget its details are returned", async () => {
            const email = 'user1@mail.com';
            const password = 'password1';
            let token1;
            const user1 = {
                email,
                password
            };

           const userCreated = await request(app)
                .post('/auth/signup')
                .send(user1);

            const login = await request(app)
                .post('/auth/login')
                .send(user1);
            token1 = login.body.token

            const budgetTitle = 'test budget';
            const userId = userCreated.body._id;
            const budget = {
                budgetTitle,
                userId
            };

            const createdBudget = await request(app)
                .post('/budgets')
                .send(budget);

            const title = 'test category';
            const incOrExp = 'income';
            const newCategory = {
                title,
                incOrExp
            };

            const createdCategory = await request(app)
                .post('/categories')
                .send(newCategory);

            const description = 'test transaction';
            const amount = 5;
            const categoryId = createdCategory.body._id;
            const budgetId = createdBudget.body._id;
            const transaction = {
                description,
                amount,
                categoryId,
                budgetId,
            };

            await request(app)
                .post('/transactions')
                .set('Authorization', 'Bearer ' + token1)
                .send(transaction);

            // const returnTransaction = createdTransaction.body._id;
            // console.log(returnTransaction);
            const filterBudget = {
                incOrExp: 'income'
            }

            const response = await request(app)
                .get('/budgets/' + budgetId + '/filter')
                .set('Authorization', 'Bearer ' + token1)
                .send(filterBudget);
            expect(response.statusCode).toEqual(200);
        });
    });
});