const mongoose = require('mongoose');

const ShirtSchema = new mongoose.Schema ({

    productName :{
        type: String,
        unique : true,
        required : [true,'productName is required']
    },
    companyName	: {
        type : String
    },
    productImg: {
        type : String
    },	
    price : {
        type : Number
    },
    productDescription : {
        type : String
    },
    quentity: {
        type : Number
    },
    hasDiscount:{
        type: Boolean,
        default : false
    }

})

const Shirt = mongoose.model("Shirt",ShirtSchema); //mongoDB ploralize the collection name, behind the sene there is class

module.exports = Shirt;