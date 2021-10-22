const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');

const config = require('../config');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();

const mysqlDb = require('../mysqlDb');

router.get('/', async (req, res) => {
    const data = await mysqlDb.getItems();
    res.send(data);
});

router.get('/:id', async (req, res) => {
    const data = await mysqlDb.getItemById(req.params.id);

    if(!data) {
        return res.status(404).send({error: 'Item is not found'});
    }

    res.send(data);
});

router.post('/', upload.single('image'), async (req, res) => {
    if (!req.body.name || !req.body.category_id || !req.body.location_id) {
        return res.status(400).send({"error": "Incorrect data"});
    }

    const item = {
        categoryId: req.body.category_id,
        locationId: req.body.location_id,
        name: req.body.name,
        description: req.body.description,
    };

    if (req.file) {
        item.image = req.file.filename;
    }

    const newData = await mysqlDb.addItem(item);

    res.send({
        ...item,
        id: newData.insertId,
    });
});

router.delete('/:id', async (req, res) => {
    let data;

    try {
        data = await mysqlDb.deleteItem(req.params.id);
    } catch (e) {
        return res.status(404).send({error: 'Item can not be deleted'});
    }

    if (data.affectedRows === 0) {
        return res.status(404).send({error: 'Item is not found'});
    }

    res.send({message: `id = ${req.params.id} deleted successfully!`});
});

router.put('/:id', upload.single('image'), async (req, res) => {
    if (!req.body.name || !req.body.category_id || !req.body.location_id) {
        return res.status(400).send({error: "Incorrect data"});
    }

    const item = {
        category_id: req.body.category_id,
        location_id: req.body.location_id,
        name: req.body.name,
        description: req.body.description,
    };

    if (req.file) {
        item.image = req.file.filename;
    }

    const data = await mysqlDb.editItem({...item}, req.params.id);

    if (data.affectedRows === 0) {
        return res.status(404).send({error: 'Item is not found'});
    }

    res.send({message: `id = ${req.params.id} updated successfully!`});
});


module.exports = router;