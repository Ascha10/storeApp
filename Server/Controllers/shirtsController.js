const Shirt = require('../Models/Shirt');

let getShirts = async (req,res) => {
   await Shirt.find({}).then((data) => {
        res.send(data)
})};

let getShirtById = async (req,res) => {
   await Shirt.findOne(req.params.id).then((data) => {
        res.send(data)
})};


let addShirts = async (req,res) => {
   await Shirt.create(req.body).then((data) => { 
    res.send(data)
})};


let updateShirts = async (req,res) => {
   await Shirt.findByIdAndUpdate({_id : req.params.id},req.body).then(() => {
        Shirt.findOne({_id : req.params.id}).then((data) => {
            res.send(data)
        })
})};

let deleteShirts = async (req,res) => {
   await Shirt.findByIdAndRemove({_id : req.params.id}).then((data) => {
        res.send(data)
})};



module.exports = {
    getShirts,
    getShirtById,
    addShirts,
    updateShirts,
    deleteShirts
};

