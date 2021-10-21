const express = require('express');
const router = express.Router();

const mysqlDb = require('../mysqlDb');

router.get('/', async (req, res) => {
    const [data] = await mysqlDb.getConnection().query(
        'SELECT ??, ?? FROM ??',
        ['id', 'title', 'categories']
    );

    res.send(data);
});

router.get('/:id', async (req, res) => {
    const [data] = await mysqlDb.getConnection().query(
        `SELECT * FROM ?? WHERE id = ?`,
        ['categories', req.params.id]
    );

    if(!data[0]) {
        return res.status(404).send({error: 'Category is not found'});
    }

    res.send(data[0]);
});

router.post('/', async (req, res) => {
    if (!req.body.title) {
        res.status(400).send({"error": "Incorrect data"});
        return;
    }

    const category = {
        title: req.body.title,
        description: req.body.description,
    };

    const newData = await mysqlDb.getConnection().query(
        'INSERT INTO ?? (title, description) VALUES (?, ?)',
        ['categories', category.title, category.description]
    );

    res.send({
        ...category,
        id: newData[0].insertId,
    });
});

router.delete('/:id', async (req, res) => {
    const [data] = await mysqlDb.getConnection().query(
        'DELETE FROM ?? WHERE id = ?',
        ['categories', req.params.id]
    );

    if (data.affectedRows === 0) {
        return res.status(404).send({error: 'Category is not found'});
    }

    res.send({message: `id = ${req.params.id} deleted successfully!`});
});

router.put('/:id', async (req, res) => {
    if (!req.body.title) {
        res.status(400).send({"error": "Incorrect data"});
        return;
    }

    const category = {
        title: req.body.title,
        description: req.body.description,
    };

    const [data] = await mysqlDb.getConnection().query(
        'UPDATE ?? SET ? WHERE id = ?',
        ['categories', {...category}, req.params.id]
    );

    console.log(data)
    if (data.affectedRows === 0) {
        return res.status(404).send({error: 'Category is not found'});
    }

    res.send({message: `id = ${req.params.id} updated successfully!`});
});

module.exports = router;