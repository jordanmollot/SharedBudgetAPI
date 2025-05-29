const request = require("supertest");
const app = require('../app');
// const server = require("../server");

const testUtils = require("../test-utils");

const User = require("../models/user");
const Budget = require("../models/budget");
const Transaction = require("../models/transaction");
const Category = require("../models/category");

describe('transaction routes', () => {
    beforeAll(testUtils.connectDB);  
    afterEach(testUtils.clearDB);
    afterAll(testUtils.stopDB);

    describe('POST /transactions', () => {
        it("should send 200 if a transaction is created", async () => {
            const email = 'user1@mail.com';
            const password = 'password1';
            let token1;
            const user1 = {
                email,
                password
            };
            // const newPassword = {
            //     password: 'passwordUpdated'
            // };

           const userCreated = await request(app)
                .post('/auth/signup')
                .send(user1);

            const login = await request(app)
                .post('/auth/login')
                .send(user1);
            token1 = login.body.token

            //
            const budgetTitle = 'test budget';
            const userId = userCreated.body._id;
            // console.log(userId);
            const budget = {
                budgetTitle,
                userId
            };
            // await Budget.insertMany(budget);
    //         // console.log(budget);

            const createdBudget = await request(app)
                .post('/budgets')
                .send(budget);

            const title = 'test category';
            const incOrExp = 'income';
            const newCategory = {
                title,
                incOrExp
            };

            // await Category.insertMany(newCategory);
            // console.log(budget);

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
            // console.log(token1);
            // console.log(transaction);

            const response = await request(app)
                .post('/transactions')
                .set('Authorization', 'Bearer ' + token1)
                .send(transaction);
            expect(response.statusCode).toEqual(200);
        });
    });

    describe('GET /transactions', () => {
        it("should send 200 if the specified transaction is returned", async () => {
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

            const createdTransaction = await request(app)
                .post('/transactions')
                .set('Authorization', 'Bearer ' + token1)
                .send(transaction);

            const returnTransaction = createdTransaction.body._id;
            console.log(returnTransaction);

            const response = await request(app)
                .get('/transactions/' + returnTransaction)
                .send();
            expect(response.statusCode).toEqual(200);
        });
    });
});