//import product collection/model
const cartitems = require('../models/cartSchema')

//add to cart
exports.addtocart = async (req, res) => {
    //get products details from req
    const { id, title, image, price, quantity } = req.body


    //logic
    try {
        //check product is in cart collection
        const product = await cartitems.findOne({ id })

        if (product) {
            //product is in cart
            //increment product quantity
            product.quantity += 1
            //update grandtotal
            product.grandTotal = product.price * product.quantity
            //to save change in mongodb
            product.save()
            //send response to client
            res.status(200).json("Items added to your cart...")

        }
        else {
            //
            //add item in cart collection 
            const newProduct = new cartitems({
                id, title, price, image, quantity, grandTotal: price
            })
            //to store db
            await newProduct.save()
            res.status(200).json("Item added to your cart...")
        }

    }
    catch (error) {
        res.status(401).json(error)
    }
}

//get cart
exports.getCart = async (req, res) => {
    try {
        //get all items cart collection
        const allItems = await cartitems.find()
        res.status(200).json(allItems)

    }
    catch (error) {
        res.status(401).json(error)
    }

}

//cart item removing
exports.removefromcartlist = async (req, res) => {
    //get id from req
    const { id } = req.params

    //remove id from wishlist collection
    try {
        const removeItem = await cartitems.deleteOne({ id })
        if (removeItem) {
            //get all wishlist item after removing the perticular item
            const allItems = await cartitems.find()
            res.status(200).json(allItems)
        }
        else {
            res.status(404).json("Item not present in your cartlist")

        }

    }
    catch (error) {
        res.status(401).json(error)
    }
}

//empty cart
exports.emptycart = async (req, res) => {
    try {
        await cartitems.deleteMany({})
        res.status(200).json("Your cart is Empty Now!!!!")
    }
    catch (error) {
        res.status(401).json(error)
    }
}

//increment item added
exports.incrementCount = async (req, res) => {
    //get id from req
    const { id } = req.params

    try {
        //check product is in cart collection
        const product = await cartitems.findOne({ id })

        if (product) {
            //update quantity,grandTotal
            product.quantity += 1
            product.grandTotal = product.price * product.quantity
            //to save change in mongodb
            await product.save()
            //get all cart collection item after update the particular item count
            const allItems = await cartitems.find()
            res.status(200).json(allItems)
        }
        else {
            res.status(401).json("Product is not in your cart....")
        }

    }

    catch (error) {
        res.status(401).json(error)
    }

}

//decrement item 
exports.decrementCartQantity = async (req, res) => {
    //get id from req
    const { id } = req.params

    try {
        //check product is in cart collection
        const product = await cartitems.findOne({ id })

        if (product) {
            //update quantity
            product.quantity -= 1
            //check quantity =0
            if (product.quantity == 0) {
                //remove product from cart collection
                await cartitems.deleteOne({ id })
                //get all cart collection item after removing the particular item
                const allItems = await cartitems.find()
                res.status(200).json(allItems)
            }
            else{
                product.grandTotal = product.price * product.quantity
                //to save change in mongodb
                await product.save()
                //get all cart collection item after update the particular item count
                const allItems = await cartitems.find()
                res.status(200).json(allItems)
            }
        }
        else {
            res.status(401).json("Product is not in your cart....")
    }

    }

    catch (error) {
        res.status(401).json(error)
    }

}
