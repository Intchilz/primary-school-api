const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req,res) => {
    const result = await mongodb.getDatabase().db('primaryschool').collection('teachers').find();
    result.toArray().then((teachers) => {
        try {
            res.setHeader('content-Type', 'application/json');
            res.status(200).json(teachers);
        } catch (err) {
            res.status(500).json(response.error || 'Some error occured while getting Administrators.');
        }
});
};

const getSingle = async (req,res) => {
    const userId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDatabase().db('primaryschool').collection('teachers').find({ _id: userId });
            result.toArray().then((teachers) => {
            res.setHeader('content-Type', 'application/json');
            res.status(200).json(teachers[0]);
        });
    } catch (err) {
        console.error('Error getting teachers:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createUser = async (req,res) => {
    const users = {
        name: req.body.name,
        contact: req.body.contact,
        subject: req.body.subject,
        class: req.body.class
    };
    try {
        const response = await mongodb.getDatabase().db('primaryschool').collection('teachers').insertOne(users);
        if (response.acknowledged) {
        res.status(204).send();
        }  else {
        res.status(500).json(response.error || 'Some error occured while updating users.');
        }
    } catch (err) {
        console.error('Error adding teacher:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const updateteacher = async (req,res) => {
    const teacherId = new ObjectId(req.params.id);
    const patient = {
        name: req.body.name,
        contact: req.body.contact,
        subject: req.body.subject,
        class: req.body.class
    };
    try {
    const response = await mongodb.getDatabase().db('primaryschool').collection('teachers').replaceOne({_id: teacherId}, patient);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.err || 'Some error occured while updating teacher information.');
    }
    } catch (err) {
        console.error('Error updating teacher:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteteacher = async (req,res) => {
    const teacherId = new ObjectId(req.params.id);
    try {
    const response = await mongodb.getDatabase().db('primaryschool').collection('teachers').deleteOne({_id: teacherId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.err || 'Some error occured while deleting teacher.');
    }
    } catch (err) {
        console.error('Error deleting teacher:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    getAll,
    getSingle,
    createUser,
    updateteacher,
    deleteteacher,
};