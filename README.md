

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Deployment Link:
https://order-processing-system.onrender.com


Link to Task 2:
https://docs.google.com/document/d/1gcKvb6YcIZy07GJCc6P3_OYPzgqsJiXLJ74pOtINjts/edit#heading=h.z6ne0og04bp5

● POST /auth/login: login.

username: 'admin', password: 'password123'


● POST /brands: Create a new brand. - needs admin authorization
● GET /brands/:id: Retrieve a brand by its ID.
● PATCH /brands/:id: Update a brand by its ID. - needs admin authorization
● DELETE /brands/:id: Delete a brand by its ID. - needs admin authorization
● GET /brands: Retrieve a list of all brands with pagination.

● POST /brands/:brandId/meals: Create a new meal.
● GET /brands/:brandId/meals/:mealId: Retrieve a meal by its ID.
● PATCH /brands/:brandId/meals/:mealId: Update a meal by its ID.
● DELETE /brands/:brandId/meals/:mealId: Delete a meal by its ID.
● GET /brands/:brandId/meals: Retrieve a list of all meals with pagination.

● POST /meals/:mealId/addons: Create a new addon.
● GET /meals/:mealId/addons/:id: Retrieve a addon by its ID.
● PATCH /meals/:mealId/addons/:id: Update a addon by its ID.
● DELETE /meals/:mealId/addons/:id: Delete a addon by its ID.
● GET /meals/:mealId/addons: Retrieve a list of all addons with pagination.

● POST /order-types: Create a new order type.
● GET /order-types/:id: Retrieve a order type by its ID.
● PATCH /order-types/:id: Update a order type by its ID.
● DELETE /order-types/:id: Delete a order type by its ID.
● GET /order-types: Retrieve a list of all order types with pagination.

● POST /calculated-orders: Create a new calculated order.
● GET /calculated-orders/:id: Retrieve a calculated order by its ID.
● PUT /calculated-orders/:id: Update a calculated order by its ID.
● DELETE /calculated-orders/:id: Delete a calculated order by its ID.
● GET /calculated-orders: Retrieve a list of all calculated orders with pagination.

● POST /orders: Create a new order.
● GET /orders/:id: Retrieve a order by its ID.
● PUT /orders/:id: Update a order by its ID.
● DELETE /orders/:id: Delete a order by its ID.
● GET /orders: Retrieve a list of all orders with pagination.
● PATCH /orders/:id/process: Validates order status and checks kitchen processes.

● POST /orders/:orderId/logs: Create a new order log.
● GET /orders/:orderId/logs/:logId: Retrieve a order log by its ID.
● PUT /orders/:orderId/logs/:logId: Update a order log by its ID.
● DELETE /orders/:orderId/logs/:logId: Delete a order log by its ID.
● GET /orders/:orderId/logs: Retrieve a list of all order logs with pagination.