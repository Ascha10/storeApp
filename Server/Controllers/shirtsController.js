const Shirt = require('../Models/Shirt');

let getShirts = (req,res) => {
    Shirt.find({}).then((data) => {
        res.send(data)
})};


let addShirts = (req,res) => {
    Shirt.create(req.body).then((data) => { 
    res.send(data)
})};


let updateShirts = (req,res) => {
    Shirt.findByIdAndUpdate({_id : req.params.id},req.body).then(() => {
        Shirt.findOne({_id : req.params.id}).then((data) => {
            res.send(data)
        })
})};

let deleteShirts = (req,res) => {
    Shirt.findByIdAndRemove({_id : req.params.id}).then((data) => {
        res.send(data)
})};



module.exports = {
    getShirts,
    addShirts,
    updateShirts,
    deleteShirts
};

