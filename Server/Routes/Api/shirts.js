const express = require('express');
const router = express.Router();
const shirtsController = require('../../Controllers/shirtsController');


router.get('/shirts',shirtsController.getShirts)

router.post('/shirts',shirtsController.addShirts)


router.put('/shirts/:id',shirtsController.updateShirts)

router.delete('/shirts/:id',shirtsController.deleteShirts)


module.exports = router;
