const mysql = require('mysql2/promise');
const config = require('./config');
const dayjs = require('dayjs');

let connection = null;

const categories = 'categories';
const locations = 'locations';
const accountingSubjects = 'accounting_subjects';

module.exports = {
    connect: async () => {
        connection = await mysql.createConnection(config.databaseOptions);
        console.log(`Connected! id=${connection.threadId}`);
    },
    getConnection: () => connection,

// Categories
    async getCategories() {
        const [data] = await this.getConnection().query(
            'SELECT ??, ?? FROM ??',
            ['id', 'name', categories]
        );

        return data;
    },
    async getCategoryById(id) {
        const [data] = await this.getConnection().query(
            `SELECT * FROM ?? WHERE id = ?`,
            [categories, id]
        );

        return data[0];
    },
    async addCategory(item) {
        const data = await this.getConnection().query(
            'INSERT INTO ?? (name, description) VALUES (?, ?)',
            [categories, item.name, item.description]
        );

        return data[0];
    },
    async deleteCategory(id) {
        const [data] = await this.getConnection().query(
            'DELETE FROM ?? WHERE id = ?',
            [categories, id]
        );

        return data;
    },
    async editCategory(item, id) {
        const [data] = await this.getConnection().query(
            'UPDATE ?? SET ? WHERE id = ?',
            [categories, item, id]
        );
        return data;
    },

// Locations
    async getLocations() {
        const [data] = await this.getConnection().query(
            'SELECT ??, ?? FROM ??',
            ['id', 'name', locations]
        );

        return data;
    },
    async getLocationById(id) {
        const [data] = await this.getConnection().query(
            `SELECT * FROM ?? WHERE id = ?`,
            [locations, id]
        );

        return data[0];
    },
    async addLocation(item) {
        const data = await this.getConnection().query(
            'INSERT INTO ?? (name, description) VALUES (?, ?)',
            [locations, item.name, item.description]
        );

        return data[0];
    },
    async deleteLocation(id) {
        const [data] = await this.getConnection().query(
            'DELETE FROM ?? WHERE id = ?',
            [locations, id]
        );

        return data;
    },
    async editLocation(item, id) {
        const [data] = await this.getConnection().query(
            'UPDATE ?? SET ? WHERE id = ?',
            [locations, item, id]
        );
        return data;
    },

// Items
    async getItems() {
        const [data] = await this.getConnection().query(
            'SELECT ??, ??, ??, ?? FROM ??',
            ['id', 'name', 'category_id', 'location_id', accountingSubjects]
        );

        return data;
    },
    async getItemById(id) {
        const [data] = await this.getConnection().query(
            `SELECT * FROM ?? WHERE id = ?`,
            [accountingSubjects, id]
        );

        return data[0];
    },
    async addItem(item) {
        item.datetime = dayjs().format('YYYY-MM-DDTHH:mm:ss');
        const data = await this.getConnection().query(
            `INSERT INTO ?? (category_id, location_id, name, description, registration_date, image) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                accountingSubjects,
                item.categoryId,
                item.locationId,
                item.name,
                item.description,
                item.datetime,
                item.image
            ]
        );

        return data[0];
    },
    async deleteItem(id) {
        const [data] = await this.getConnection().query(
            'DELETE FROM ?? WHERE id = ?',
            [accountingSubjects, id]
        );

        return data;
    },
    async editItem(item, id) {
        const [data] = await this.getConnection().query(
            'UPDATE ?? SET ? WHERE id = ?',
            [accountingSubjects, item, id]
        );

        return data;
    },
};