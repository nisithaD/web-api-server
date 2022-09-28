var express = require('express');
var router = express.Router();
var { verifyToken } = require('../middlewares/authenticator');

// TODO: All Orders
router.get('/', (req, res) => { });
// TODO: Get specific Order
router.get('/:id', (req, res) => { });
// TODO: Get All Order of specific user
router.get('/user/:id', (req, res) => { });
// TODO: Get all orders of specific Restaurant
router.get('/restaurant/:id', (req, res) => { });

// TODO: Create Order
router.post('/', (req, res) => { });

// TODO: Update a Order
router.put('/:id', (req, res) => { });

// Don't Give option to delete orders
