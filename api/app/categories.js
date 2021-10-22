const express = require('express');
const router = express.Router();

const mysqlDb = require('../mysqlDb');

router.get('/', async (req, res) => {
    const data = await mysqlDb.getCategories();
    res.send(data);
});

router.get('/:id', async (req, res) => {
    const data = await mysqlDb.getCategoryById(req.params.id);

    if(!data) {
        return res.status(404).send({error: 'Category is not found'});
    }

    res.send(data);
});

router.post('/', async (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({"error": "Incorrect data"});
    }

    const category = {
        name: req.body.name,
        description: req.body.description,
    };

    const newData = await mysqlDb.addCategory(category);

    res.send({
        ...category,
        id: newData.insertId,
    });
});

router.delete('/:id', async (req, res) => {
    let data;

    try {
        data = await mysqlDb.deleteCategory(req.params.id);
    } catch (e) {
        return res.status(404).send({error: 'Category can not be deleted'});
    }

    if (data.affectedRows === 0) {
        return res.status(404).send({error: 'Category is not found'});
    }

    res.send({message: `id = ${req.params.id} deleted successfully!`});
});

router.put('/:id', async (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({error: "Incorrect data"});
    }

    const category = {
        name: req.body.name,
        description: req.body.description,
    };

    const data = await mysqlDb.editCategory({...category}, req.params.id);

    if (data.affectedRows === 0) {
        return res.status(404).send({error: 'Category is not found'});
    }

    res.send({message: `id = ${req.params.id} updated successfully!`});
});

module.exports = router;