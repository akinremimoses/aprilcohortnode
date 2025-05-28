const express = require('express'); // to import express
const app = express(); // to use express
const ejs = require('ejs')
const dotenv = require('dotenv')
dotenv.config()
const bcrypt = require('bcryptjs')
const cors = require('cors')
app.use(cors());
app.use(express.json({limit: '50mb'}))
const mongoose = require('mongoose')
const ProductModel = require('./models/product.model')
const UserModel = require('./models/user.model')
const path = require('path');
const e = require('express');
const { type } = require('os');
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true , limit:'50mb'}))
const UserRoute = require('./routes/user.routes')
app.use('/user', UserRoute)
const ProductRoute = require('./routes/product.routes')
app.use('/products', ProductRoute)


//we have different types of request, they are get, post, put, delete, patch
// HOW TO CREATE PATH OR ROUTE: creating path or route in node
//app.get(path, callback)
// to send a file use res.sendFile() but dont forget __dirname
// you can send any data as response using res.send()

// URI = means uniform resource identifier
let URI = process.env.DATABASE_URI;
mongoose.connect(URI)
    .then(() => {
        console.log('data connected');
    }).catch(() => {
        console.log(e);
    })
let message;

let personalStuff = {
    todoAtHome: 'watch tv, eat rice',
    status: 'done if true'
}


let fruits = ['banana', 'orange', 'cocnut']
// app.get('/', (req, res)=>{
//     // res.send([personalStuff, fruits])
//     // res.send(`<h1>Hello wold!</h1>`)
//     console.log(__dirname);
//     res.sendFile(__dirname+ '\/index.html')

// })

// app.get('/PRODUCTS', (req, res)=>{

//     res.sendFile(__dirname+ '\/classwa.html')
// })

// app.get('/logo', (req, res)=>{

//     res.sendFile(__dirname+ '\/logo.jpeg')
// })





const products = [
    {
        "productName": "shoe",
        "productPrice": "3000",
        "productImage": "https://th.bing.com/th/id/OIP.XOVdjiqU2X36zbtpjaC_6AHaE8?rs=1&pid=ImgDetMain",
        "productQuantity": "10"
    },
    {
        "productName": "hat",
        "productPrice": "1500",
        "productImage": "https://th.bing.com/th/id/OIP.JRkczbg5xpeYfoG5KvT1dwHaE8?pid=ImgDet&rs=1",
        "productQuantity": "15"
    },
    {
        "productName": "watch",
        "productPrice": "5000",
        "productImage": "https://th.bing.com/th/id/OIP.oifH0ZnqaS6GnsFWVG1d5gHaEK?pid=ImgDet&rs=1",
        "productQuantity": "8"
    },
    {
        "productName": "jacket",
        "productPrice": "7000",
        "productImage": "https://th.bing.com/th/id/OIP.WpcXYnltPfxjJ8AfxKps-wHaJ4?pid=ImgDet&rs=1",
        "productQuantity": "5"
    },
    {
        "productName": "jeans",
        "productPrice": "2000",
        "productImage": "https://th.bing.com/th/id/OIP.PAlQuStgd5yLqaF8KHFXYgHaDt?pid=ImgDet&rs=1",
        "productQuantity": "12"
    },
    {
        "productName": "sunglasses",
        "productPrice": "1800",
        "productImage": "https://th.bing.com/th/id/OIP.60Y87V5MbO4svwH70zJ4XAHaFj?pid=ImgDet&rs=1",
        "productQuantity": "20"
    },
    {
        "productName": "backpack",
        "productPrice": "4000",
        "productImage": "https://th.bing.com/th/id/OIP.r7u70xHhqr3X89HqXx3qfQHaK7?pid=ImgDet&rs=1",
        "productQuantity": "7"
    },
    {
        "productName": "belt",
        "productPrice": "1200",
        "productImage": "https://th.bing.com/th/id/OIP._RL2hjVG5JJbzLP_XlAq0QHaFj?pid=ImgDet&rs=1",
        "productQuantity": "25"
    },
    {
        "productName": "scarf",
        "productPrice": "800",
        "productImage": "https://th.bing.com/th/id/OIP.MOYk93rpdTuyGl2e8bWkugHaJI?pid=ImgDet&rs=1",
        "productQuantity": "30"
    },
    {
        "productName": "sneakers",
        "productPrice": "3500",
        "productImage": "https://th.bing.com/th/id/OIP.FjmE7vUjtbeNwFgfXPi8fgHaFc?pid=ImgDet&rs=1",
        "productQuantity": "9"
    }
]

app.get('/makins', (req, res) => {

    res.render('index')
})










// to create a server
// app.listen(port, callback)

let port = 5000
app.listen(port, (err) => {
    if (err) {
        console.log('server cannot start');
    } else {
        console.log('server started succesfully');
    }
})

