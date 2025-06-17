const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req,res) => {
    const result = await mongodb.getDatabase().db('primaryschool').collection('administration').find();
    result.toArray().then((administration) => {
        try {
            res.setHeader('content-Type', 'application/json');
            res.status(200).json(administration);
        } catch (err) {
            res.status(500).json(response.error || 'Some error occured while getting Administrators.');
        }
});
};

const getSingle = async (req,res) => {
    const userId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDatabase().db('primaryschool').collection('administration').find({ _id: userId });
            result.toArray().then((administration) => {
            res.setHeader('content-Type', 'application/json');
            res.status(200).json(administration[0]);
        });
    } catch (err) {
        console.error('Error getting administrator:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createUser = async (req,res) => {
    const users = {
        name: req.body.name,
        contact: req.body.contact,
        email: req.body.email,
        position: req.body.position
    };
    try {
        const response = await mongodb.getDatabase().db('primaryschool').collection('administration').insertOne(users);
        if (response.acknowledged) {
        res.status(204).send();
        }  else {
        res.status(500).json(response.error || 'Some error occured while adding administrator.');
        }
    } catch (err) {
        console.error('Error occured:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateAdmin = async (req,res) => {
    const adminId = new ObjectId(req.params.id);
    const patient = {
        name: req.body.name,
        contact: req.body.contact,
        email: req.body.email,
        position: req.body.position
    };
    try {
    const response = await mongodb.getDatabase().db('primaryschool').collection('administration').replaceOne({_id: adminId}, patient);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.err || 'Some error occured while updating Admin information.');
    }
    } catch (err) {
        console.error('Error updating Admin:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteAdmin = async (req,res) => {
    const adminId = new ObjectId(req.params.id);
    try {
    const response = await mongodb.getDatabase().db('primaryschool').collection('administration').deleteOne({_id: adminId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.err || 'Some error occured while deleting Admin.');
    }
    } catch (err) {
        console.error('Error deleting Admin:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateAdmin,
    deleteAdmin
};