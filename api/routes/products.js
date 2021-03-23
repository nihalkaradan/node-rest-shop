const express = require('express');

const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');
const { request } = require('../../app');

router.get('/', (req, res, next) => {
    Product
        .find()
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});

router.post('/', (req, res, next) => {
    // const product = {
    //     name: req.body.name,
    //     price: req.body.price
    // }
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product.save().then(res => {
        res.status(201).json({
            message: 'Handling POST requests to /products',
            createdProduct: product
        });
    }).catch(err => {
        res.status(400).json({
            error: err
        })
    });

});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).exec().then(doc => {
        console.log(doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message: "No valid entry found!"
            })
        }

    }).catch(err => {
        console.log(err);
        res.status(500).json({ err })
    })
    // if(id==='special'){
    //     res.status(200).json({
    //         message: 'you have discovered special id',
    //         id: id
    //     })
    // }else{
    //     res.status(200).json({
    //         message: 'you have passed an id'
    //     })
    // }
})
router.patch("/:productId", (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
router.delete('/:productId', (req, res, next) => {
    id = req.params.productId;
    Product
        .remove({ _id: id })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({ result })
        })
        .catch(err => {
            console.log(err)
        })
    // res.status(200).json({
    //     message: 'resource deleted!',
    //     id: id
    // })
})

module.exports = router;