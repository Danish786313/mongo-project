const Product = require("../models/productmodel")
const { mongoose, ObjectId } = require("mongoose").Types.ObjectId;

exports.getproduct = async (req, res, next, id) => {
    

}

exports.getall = async (req, res) => {
    Product.find().select().exec().then(result => {
        if (!result.length) {
            return res.status(200).json({
                success: true,
                message: "Product does not exist",
                count: result.length,
            })
        }
        res.status(200).json({
            success: true,
            message: "All product fetched successfully",
            count: result.length,
            result: result
        })
    }).catch(err => {
        res.status(400).json({
            success: false,
            message: "Error while fetching products",
            error: err
        })
    })
}

exports.createproduct = async (req, res) => {
    console.log(req.file.path, req.body)
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        quantity: req.body.quantity,
        productImage: req.file.path
    })

    product.save().then(result => {
        res.status(200).json({
            success: true,
            message: "product created succesfully",
            result: result
        })
    }).catch(err => {
        res.status(400).json({
            success: true,
            message: "Something went wrong while creating product",
            error: err
        })
    })
}

exports.findOne = async (req, res) => {
    Product.findById(req.params.productId).select().exec().then(result => {
        res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            result: result
        })
    }).catch(err => {
            res.status(400).json({
                success: true,
                message: "error while fetching product",
                error: err
            })
        })
}

exports.patchproduct = async (req, res) => {
    const id = req.params.productId
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Product.update({ _id: id}, {$set: updateOps}).exec().then(result => {
        res.status(200).json({
            success: true,
            message: "Product updated successfullty",
            result: result
        })
    }).catch(err => {
        res.status(400).json({
            success: false,
            message: "Errore while updating product",
            error: err
        })
    })
}

exports.deleteproduct = async (req, res) => {
    Product.remove({ _id: req.params.productId }).exec().then(result => {
        res.status(200).json({
            success: true,
            message: "Product deleted succesfully",
            result: result
        })
    }).catch(err => {
        res.status(400).json({
            success: true,
            message: "Error while deleting product",
            error: err
        })
    })
}