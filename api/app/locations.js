const express = require('express');
const router = express.Router();

const mysqlDb = require('../mysqlDb');

router.get('/', async (req, res) => {
    const data = await mysqlDb.getLocations();
    res.send(data);
});

router.get('/:id', async (req, res) => {
    const data = await mysqlDb.getLocationById(req.params.id);

    if(!data) {
        return res.status(404).send({error: 'Location is not found'});
    }

    res.send(data);
});

router.post('/', async (req, res) => {
    if (!req.body.name) {
        res.status(400).send({"error": "Incorrect data"});
        return;
    }

    const location = {
        name: req.body.name,
        description: req.body.description,
    };

    const newData = await mysqlDb.addLocation(location);

    res.send({
        ...location,
        id: newData.insertId,
    });
});

router.delete('/:id', async (req, res) => {
    const data = await mysqlDb.deleteLocation(req.params.id);

    if (data.affectedRows === 0) {
        return res.status(404).send({error: 'Location is not found'});
    }

    res.send({message: `id = ${req.params.id} deleted successfully!`});
});

router.put('/:id', async (req, res) => {
    if (!req.body.name) {
        res.status(400).send({error: "Incorrect data"});
        return;
    }

    const location = {
        name: req.body.name,
        description: req.body.description,
    };

    const data = await mysqlDb.editLocation({...location}, req.params.id);

    if (data.affectedRows === 0) {
        return res.status(404).send({error: 'Location is not found'});
    }

    res.send({message: `id = ${req.params.id} updated successfully!`});
});


module.exports = router;