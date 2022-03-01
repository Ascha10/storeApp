const express = require('express');
const router = express.Router();
const {getShirts,getShirtById,addShirts,updateShirts,deleteShirts} = require('../../Controllers/shirtsController');


router.get('/shirts',getShirts)

router.get('/shirts/:id',getShirts)

router.post('/shirts',addShirts)

router.put('/shirts/:id',updateShirts)

router.delete('/shirts/:id',deleteShirts)


module.exports = router;
