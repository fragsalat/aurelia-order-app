var express = require('express');
var Store = require('./store');

var router = express.Router();
var store = new Store();
// Set some default data
store.add({
    "id": 1,
    "articleName": "Levi's® 501® CT Jeans",
    "sku": "5K324NC12",
    "quantity": 400,
    "price": 32.99,
    "status": "pending"
});
store.add({
    "id": 2,
    "articleName": "Adidas® Daily Team Shoe",
    "sku": "774DSR34",
    "quantity": 1000,
    "price": 54.99,
    "status": "pending"
});
store.add({
    "id": 3,
    "articleName": "Nike® Air Max® Thea Obsidian 38",
    "sku": "732229I7OP",
    "quantity": 761,
    "price": 74.99,
    "status": "done"
});

/**
 * GET /order/:id
 */
router.get('/:id', (request, response) => {
    var order = store.get(request.params.id);
    if (!order) {
        return response.status(404).end()
    }
    response.json({
        success: true,
        data: order
    });
});

/**
 * GET /order/:offset/:limit
 */
router.get('/list/:offset/:limit', (request, response) => {
    var offset = parseInt(request.params.offset) || 0;
    var limit = parseInt(request.params.limit) || 10;
    var orders = store.data.slice(offset, offset + limit);

    response.json({
        success: true,
        data: orders
    }).end();
});

/**
 * POST /order/create
 * Body {articleName: string, sku: string, quantity: number, price: number}
 */
router.post('/create', (request, response) => {
    var lastId = Math.max(...store.data.map(obj => obj.id));
    var order = request.body;
    order.id = lastId + 1;
    order.status = 'pending';

    store.add(order);

    response.json({
        success: true,
        data: order
    }).end();
});

/**
 * POST /order/create/:id
 * Body {articleName: string, sku: string, quantity: number, price: number}
 */
router.post('/edit/:id', (request, response) => {
    var oldOrder = store.get(request.params.id);
    // Assign new data to old object and use the result
    var order = Object.assign(oldOrder, request.body);

    store.put(request.params.id, order);

    response.json({
        success: true,
        data: order
    }).end();
});

/**
 * GET /order/delete/:id
 */
router.get('/delete/:id', (request, response) => {
    store.remove(request.params.id);

    response.json({
        success: true
    }).end();
});

module.exports = {
    router: router,
    store: store
};
