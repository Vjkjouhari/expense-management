const express = require('express');
const { addTransection, getAllTransection, editTransection, deleteTransection } = require('../controllers/transectionController');

const Router = express.Router();

// add transection 

Router.post('/add-trasection', addTransection)

Router.post('/edit-trasection',editTransection)

Router.post('/delete-transection', deleteTransection)


Router.post('/get-transection', getAllTransection)


module.exports = Router