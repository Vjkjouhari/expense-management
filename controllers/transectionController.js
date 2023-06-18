const transectionModel = require('../models/transectionModel')
const moment = require('moment')


const getAllTransection = async (req, res) => {
    try {
        const {frequency, selectedDate, type} = req.body
        const transection = await transectionModel.find({
            ...(frequency !== 'custom' ? {
                date:{
                    $gt : moment().subtract(Number(frequency), 'd').toDate(),
                }
            } : {
                date : {
                    $gte: selectedDate[0],
                    $lte: selectedDate[1]
                }
            }),
            userId:req.body.userId,
            ...(type !== 'all' && {type})
        })
        res.status(200).send(transection);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
 };


const editTransection = async (req, res) =>{
    try {
        await transectionModel.findOneAndUpdate({_id:req.body.transectionId}, req.body.payload)
        res.status(200).json('Edit successfully');
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const deleteTransection = async (req, res) =>{
    try {
        await transectionModel.findOneAndDelete({_id:req.body.transectionId})
        res.status(200).json('Deleted successfully');
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const addTransection = async (req, res) => {
    console.log(new transectionModel(req.body));
    try {
        // const newTransection = new transectionModel(req.body);
        const newTransection = new transectionModel(req.body);
        await newTransection.save();
        res.status(201).send("Transection Created");
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
};

module.exports = {
    getAllTransection,
    addTransection,
    editTransection,
    deleteTransection
}