const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    /** #swagger.tags = ['Contacts'] */
    const result = await mongodb.getDatabase().db().collection('Contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

const getSingle = async (req, res) => {
    /** #swagger.tags = ['Contacts'] */
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('Contacts').find({_id: userId});
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });
};

const createContact = async (req, res) => {
    /** #swagger.tags = ['Contacts'] */
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongodb.getDatabase().db().collection('Contacts').insertOne(user);

    if(response.acknowledged) {
        res.status(201).json({ message: 'Contact created successfully' });
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
};

const updateContact = async (req, res) => {
    /** #swagger.tags = ['Contacts'] */
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongodb.getDatabase().db().collection('Contacts').replaceOne({ _id: userId }, user);

    if(response.modifiedCount > 0) {
        res.status(200).json({ message: 'Contact updated successfully' });
    }else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
};

const deleteContact = async (req, res) => {
    /** #swagger.tags = ['Contacts'] */
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('Contacts').deleteOne({ _id: userId });

    if(response.deletedCount > 0) {
        res.status(200).json({ message: 'Contact deleted successfully' });
    }else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    } 
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};