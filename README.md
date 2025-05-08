# SharedBudgetAPI

## Scenario, Problem & App Description

People like to make personal budgets, but it would be helpful for groups of people to be able to make shared budgets. A shared budget can be helpful whether it's because people live together and they want to keep their finances transparent or maybe they're planning an event with friends or co-workers and want to keep spending under a certain amount of money. 

This app allows users to create a shared budget for a group of people. Each user can see all the transactions, add transactions, remove and update transactions. There can be more than one budget admin if desired. Each transaction will have a  category (ie- utilities, eating out, entertainment, etc.) and each category will either be an expense or income. In addition to viewing all the transactions, users can also view transactions by category, income or expense.

## Technical Components

### Roles:
**All Users**
- Can C budgets
- Can R all transaction categories
**Admins** 
- Can CRUD budgets
- Can CRUD transaction categories
- If they are admin of a specific budget, can authorize users to access that budget
- If they are admin of a specific budget, can CRUD transactions within that budget
**Authorized Users**
- Can R only their budgets
- Can CRUD transactions in their authorized budgets
- Can CRUD all transaction categories associated with their authorized budget

### Models:
**User**
- Id
- Email
- Password
- Name
- Role
**Budget**
- Id
- Title
- UserId (array of UserIds)
- Transactions (array of TransactionIds)
- BudgetTotal
- ExpenseTotal
- IncomeTotal
**Transaction**
- Id
- Description
- Date
- Amount
- BudgetId
- CategoryId
**Category**
- Id
- Title
- IncomeOrExp
- BudgetID 

### Routes:
**Auth**
- POST /signup - create user
- POST /login - login to account
- PUT /auth/password - if user is logged in, change password
- PUT /auth/user - if user is logged in, change name/email
**Budget**
- POST / - if user is logged in, create budget
- GET / - if user is logged in as admin or authorized, get all their budgets
    - displays budget title for each of the user’s budgets
- GET /:budgetId - if user is authorized, get specific budget
- displays all info for specific budget, including transactions and their details
- POST /:budgetId/transactions - if authorized, creates transaction
- GET /:budgetId/transactions - if authorized, should get all transactions for their specific budget
- GET /:budgetId/transactions/:transactionId - if authorized, should get specific transaction from their specific budget
- GET /:budgetId/transactions/search - if authorized, should search/filter all their transactions for that budget by category, expense or income
- PUT /:budgetId/transactions/:transactionId- edit/update a specific transaction
- DELETE /:budgetId/transactions/:transactionId - delete a specific transaction
**Categories**
- POST / - create a category
- GET / - get all categories
- GET /:id - get a specific category
- PUT /:id - edit/update a specific category
- DELETE /:id - delete a category

### Daos:
**User**
- createUser
- updateUser
- deleteUser
**Budget**
- createBudget
- getAllBudgets
- getBudget
- updateBudget
- deleteBudget
**Transaction**
- createTransaction
- getAllTransactions
- getTransaction
- getTransactionsByCategory
    - Will utilize text search, aggregations, or lookups
- updateTransaction
- deleteTransaction
**Category**
- createCategory
- getAllCategories
- getCategory
- updateCategory
- deleteCategory

## Project Requirements

**Authentication and Authorization** - will be addressed by users logging in and the assigning of roles. Authentication and authorization will be handled by utilizing middleware. 

**2 sets of CRUD routes (not counting authentication)** - there will be a route for the budgets (which includes transactions) and then a separate route for the categories, which can be called independently of the budgets.

**Indexes for performance and uniqueness when reasonable** - I will use uniqueness for user names and categories. I might use indexes when searching/filtering the transactions.

**At least one of text search, aggregations, or lookups** - searching the transactions by category will utilize a text search, aggregations, or lookups

## Timeline

**Week 5:**
- Develop project proposal and plan
- Setup github repository
**Week 6:**
- Setup app
    - Create server
    - Connect to mongoose/mongodb
    - Setup files for models, routes and daos
- Create schemas/models
- Start working on routes and daos
**eek 7:**
- Work on routes and daos
**Week 8:**
- Prototype/proof of concept due!
- Finish routes and daos
- Work on authentication and authorization
**Week 9:**
- Finish authentication and authorization
- Create tests
- Create postman collection
**Week 10:**
- Project due- present!