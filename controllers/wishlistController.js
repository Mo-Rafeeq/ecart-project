//import product collection/model
const wishlists = require('../models/wishlistSchema')

//addto wishlist
exports.addtowishlists = async (req,res)=>{
    //get product details from request
    //using destructuring
    const {id,title,price,image} = req.body

    //logic
    try{
        //check product is in wishlist
        const item = await wishlists.findOne({id})
        if(item){
            res.status(402).json("Item already present in your wishlist")

        }
        else{
            //add item in wishlist collection 
            const newProduct = new wishlists({
                id,title,price,image
            })
            //to store db
             await newProduct.save()
            res.status(200).json("Item added to the wishlist!!!")
        }

    }
    catch(err){
       res.status(401).json(err)
    }

}

//in order to get wishlist
exports.getwishlistItems = async (req,res)=>{
    //logic
    try {
        //get all products from wishlist collection in mongodb
        const allProducts = await wishlists.find()
        res.status(200).json(allProducts)

    }
    catch (error) {
        res.status(401).json(error)
    }
}

//wishlist item removing
exports.removefromwishlist = async (req,res)=>{
    //get id from req
    const {id} = req.params

    //remove id from wishlist collection
    try{
        const removeItem = await wishlists.deleteOne({id})
        if(removeItem){
            //get all wishlist item after removing the perticular item
            const allItems = await wishlists.find()
            res.status(200).json(allItems)
        }
        else{
            res.status(404).json("Item not present in your wishlist")

        }

    }
    catch (error) {
        res.status(401).json(error)
    }
}