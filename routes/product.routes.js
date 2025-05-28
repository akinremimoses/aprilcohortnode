const express = require('express');
const { addProduct, addProductpage, displayProductPage, deleteProduct, editProductPage, editProduct } = require('../controllers/product.controller');
const router = express.Router();

router.get('/addProduct', addProductpage)




router.post('/addProduct', addProduct)




router.get('/displayProduct', displayProductPage)

router.post('/delete/:id', deleteProduct)

router.get('/edit/:id',editProductPage)

router.post('/edit/:id', editProduct)

module.exports = router
