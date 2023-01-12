const Order = require("../models/ordermodel")
const Product = require("../models/productmodel")
const mongoose = require("mongoose")

exports.createorder = async (req, res) => {
    Product.findById(req.body.productId).then(product => {
        if (!product) {
            res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            product: req.body.productId,
            quantity: req.body.quantity
        })
        return order.save() 
    })
    .then(result => {
        res.status(200).json({
            success: true,
            message: "Order created successfully",
            result: result
        })
    }).catch(err => {
        res.status(400).json({
            success: false,
            message: "Something went wrong while creating order",
            error: err
        })
    })
}

exports.findAll = async (req, res) => {
    Order.find().select('product quantity _id').populate({ path: 'Products', select: 'name' }).exec().then(order => { 
        if (!order.length) {
            res.status(404).json({
                success: false,
                message: "orders does not exist",
            })
        }
        res.status(200).json({
            success: true,
            message: "Order fetched succesfully",
            count: order.length,
            result: order
        })
    }).catch(err => {
        res.status(400).json({
            success: false,
            message: "Error while fetching orders",
            error: err
        })
    })
}

exports.findOne = async (req, res) => {
    Order.findById(req.params.orderId).populate().exec().then(order => {
        res.status(200).json({
            success: true,
            message: "orders fetched succesfully",
            result: order
        })
    }).catch(err => {
        res.status(400).json({
            success: false,
            message: "Error fetching orders",
            error: err
        })
    })
}

exports.patchorder = async (req, res) => {
    id = req.params.orderId
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }

    Order.update({ _id: id}, { $set: updateOps}).exec().then(result => {
        res.status(200).json({
            success: true,
            message: "Order update successfully",
            result: result
        })
    }).catch(err => {
        res.status(400).json({
            success: false,
            message: "Error while updating Order",
            error: err
        })
    })
}

exports.deleteorder = async (req, res) => {
    Order.remove({_id: req.params.orderId}).exec().then(order => {
        res.status(200).json({
            success: true,
            message: "Order deleted succesfully",
            result: order
        })
    }).catch(err => {
        res.status(400).json({
            success: false,
            message: "Error while deleting order",
            error: err
        })
    })
}