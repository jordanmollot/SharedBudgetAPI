const request = require("supertest");
const app = require('../app');

const testUtils = require("../test-utils");

const User = require("../models/user");
const Budget = require("../models/budget");
const Transaction = require("../models/transaction");
const Category = require("../models/category");

describe('categories routes', () => {
    beforeAll(testUtils.connectDB);  
    afterEach(testUtils.clearDB);
    afterAll(testUtils.stopDB);

    describe('POST /categories', () => {
        it("should send 200 if a category is created", async () => {
            const title = 'test category';
            const incOrExp = 'income';

            const category = {
                title,
                incOrExp
            };

            const response = await request(app)
                .post('/categories')
                .send(category);
            expect(response.statusCode).toEqual(200);
        });
    });

    describe('GET /categories', () => {
        it("should send 200 if all categories are returned", async () => {

            const category1 = { title: 'test cat 1', incOrExp: 'income' };
            const category2 = { title: 'test cat 2', incOrExp: 'expense' }; 

            await Category.insertMany(category1);
            await Category.insertMany(category2);

            const response = await request(app)
                .get('/categories')
                .send();
            expect(response.statusCode).toEqual(200);
        });
    });

    describe('PUT /categories/:id', () => {
        it("should send 200 if specified category is updated", async () => {

            const category1 = { title: 'test cat 1', incOrExp: 'income', _id: '2935f73fb681397b8a40d424' };
            const category2 = { title: 'test cat 2', incOrExp: 'expense', _id: '3935f73fb681397b8a40d424' };

            await Category.insertMany(category1);
            await Category.insertMany(category2);

            const category2Updated = { title: 'test cat 2 updated', incOrExp: 'expense' };

            const response = await request(app)
                .put('/categories/' + category2._id)
                .send(category2Updated);
            expect(response.statusCode).toEqual(200);
        });
    });

    describe('DELETE /categories/:id', () => {
        it("should send 200 if specified category is deleted", async () => {

            const category1 = { title: 'test cat 1', incOrExp: 'income', _id: '2935f73fb681397b8a40d424' };
            const category2 = { title: 'test cat 2', incOrExp: 'expense', _id: '3935f73fb681397b8a40d424' };

            await Category.insertMany(category1);
            await Category.insertMany(category2);

            const response = await request(app)
                .delete('/categories/' + category1._id)
                .send();
            expect(response.statusCode).toEqual(200);
        });
    });
});
