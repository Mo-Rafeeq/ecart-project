
//import product collection/model
const products = require('../models/productSchema')


//get all products api

exports.getallprodcuts = async (req, res) => {
    //logic
    try {
        //get all products from products collection in mongodb
        const allProducts = await products.find()
        res.status(200).json(allProducts)

    }
    catch (error) {
        res.status(401).json(error)
    }
}

//view product api
exports.viewproduct = async(req,res)=>{
    //get product id from request
    const id = req.params.id

    //logic
    //check id is present mongodb
    try{
        const product= await products.findOne({id})
        if(product){
            //send to client
            res.status(200).json(product)
        }
        else{
            res.status(404).json("product not found!!!")
        }

    }
    catch(error){
        res.status(401).json(error)

    }
}

