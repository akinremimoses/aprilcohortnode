const express = require('express')
const app = express()
const ProductModel = require('../models/product.model')
let message;

const addProductpage =  (req, res) => {
    res.render('addProduct', { message })
}


const addProduct= async (req, res) => {
    const { productName, productPrice, productImage, productQuantity } = req.body
    console.log(req.body)
    try {
        message = "product submitted succesfully"
        let productForm = new ProductModel(req.body)
        await productForm.save();
        // res.render('addProduct', { message })

        //to add new products
        // products.push(req.body)
        res.redirect('/displayProduct')
    } catch (err) {
        console.log(err);
        message = "product not added try again";
        res.redirect('/displayProduct')
    }
}


const displayProductPage = async (req, res) => {
    try {
        let product = await ProductModel.find()
        // res.render('viewProduct', { product })
        res.send({status:true, data:product})
    } catch (err) {
        console.log(err);
        res.send({ status: false, messsage: 'canot fetch products at this time' })

    }


}


const deleteProduct = (req, res) => {
    //console.log(req.params)
    const { id } = req.params  //by destructuring
    // const id = req.params.id
    console.log(id)
    products.splice(id, 1)
    res.redirect('/displayProduct')
}

const editProductPage =  (req, res) => {
    const { id } = req.params
    console.log(id)
    res.render('editProduct')
}

const editProduct = (req, res) => {
    const { id } = req.params
    console.log(id)
    products[id].productName = req.body.newProductName
    res.redirect('/displayProduct')
}
module.exports = {
    addProductpage,
    addProduct,
    displayProductPage,
    deleteProduct,
    editProductPage,
    editProduct
}