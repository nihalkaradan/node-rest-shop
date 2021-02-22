const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: 'Orders are fetched!'
    });
});

router.post('/',(req,res,next)=>{
    res.status(201).json({
        message: 'Order is created'
    });
});

router.get('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message: 'Order details',
        orderId: req.params.orderId
    });
});

router.delete('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message: 'Order is deleted',
        orderId: req.params.orderId
    });
});


module.exports = router;