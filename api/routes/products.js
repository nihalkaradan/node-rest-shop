const express = require('express');

const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

router.post('/',(req,res,next)=>{
    res.status(201).json({
        message: 'Handling POST requests to /products'
    });
});

router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    if(id==='special'){
        res.status(200).json({
            message: 'you have discovered special id',
            id: id
        })
    }else{
        res.status(200).json({
            message: 'you have passed an id'
        })
    }
})
router.patch('/:productId',(req,res,next)=>{
    id = req.params.productId;
    res.status(200).json({
        message: 'resource updated!',
        id: id
    });
})
router.delete('/:productId',(req,res,next)=>{
    id = req.params.productId;
    res.status(200).json({
        message: 'resource deleted!',
        id: id
    })
})

module.exports = router;