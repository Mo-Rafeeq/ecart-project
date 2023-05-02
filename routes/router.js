//To define routes for client request,create routes folder and router.js file

//import express
const express = require('express')

//import product controller
const productController = require('../controllers/productController')

//import product controller
const wishlistController = require('../controllers/wishlistController')

//import cartController
const cartController = require('../controllers/cartController')

//using express create object for Router class inorder to setup path
const router = new express.Router()

//use router object resolve client request in various server router

//api
//get-all products
router.get('/products/all-products',productController.getallprodcuts)

//view-products/id
router.get('/products/view-product/:id',productController.viewproduct)

//api add to wishlist
router.post('/wishlist/add-product',wishlistController.addtowishlists)

//api get-item wishlist
router.get('/wishlist/get-product',wishlistController.getwishlistItems)

//api remove wishlist item
router.delete('/wishlist/remove-item/:id',wishlistController.removefromwishlist)

//api router addtocart items
router.post('/cart/add-product',cartController.addtocart)

//get cart
router.get('/cart/all-products',cartController.getCart)

//api remove cartlist item
router.delete('/cart/remove-item/:id',cartController.removefromcartlist)

//emptycart
router.delete("/cart/remove-all-items",cartController.emptycart)

//incrementcount
router.get("/cart/increment-item/:id",cartController.incrementCount)

//dermentitemcart
router.get("/cart/decrement-item/:id",cartController.decrementCartQantity)



//export router
module.exports = router