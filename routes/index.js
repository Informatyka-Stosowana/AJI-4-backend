const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');
const categoryController = require('../controllers/categoryController');
const orderStatusController = require('../controllers/orderStatusController');

router.get('/', function(req, res) {
    res.json({
        'status' : 'working'
    });
});

// Products
router.get('/products', productController.getAll);
router.get('/products/:id', productController.getById);
router.post('/products', productController.store);
router.put('/products', productController.updateById);

// Categories
router.get('/categories', categoryController.getAll);

// Orders
router.get('/orders', orderController.getAll);
router.get('/orders/:id', orderController.getById);
router.get('/orders/:userName', orderController.getByUserName);
router.get('/orders/:orderStatus', orderController.getByOrderStatus);
router.post('/orders', orderController.store);
router.put('/orders/:id', orderController.updateOrderStatus);

// OrderStatus
router.get('/orderStatus', orderStatusController.getAll);

module.exports = router;