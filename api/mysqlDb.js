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
        try {
            const [data] = await this.getConnection().query(
                'SELECT ??, ?? FROM ??',
                ['id', 'name', categories]
            );

            return data;
        } catch (e) {
            console.log(e.message);
        }
    },
    async getCategoryById(id) {
        try {
            const [data] = await this.getConnection().query(
                `SELECT * FROM ?? WHERE id = ?`,
                [categories, id]
            );

            return data[0];
        } catch (e) {
            console.log(e.message);
        }
    },
    async addCategory(item) {
        try {
            const data = await this.getConnection().query(
                'INSERT INTO ?? (name, description) VALUES (?, ?)',
                [categories, item.name, item.description]
            );

            return data[0];
        } catch (e) {
            console.log(e.message);
        }
    },
    async deleteCategory(id) {
        try {
            const [data] = await this.getConnection().query(
                'DELETE FROM ?? WHERE id = ?',
                [categories, id]
            );

            return data;
        } catch (e) {
            console.log(e.message);
        }
    },
    async editCategory(item, id) {
        try {
            const [data] = await this.getConnection().query(
                'UPDATE ?? SET ? WHERE id = ?',
                [categories, item, id]
            );
            return data;
        } catch (e) {
            console.log(e.message);
        }
    },

// Locations
    async getLocations() {
        try {
            const [data] = await this.getConnection().query(
                'SELECT ??, ?? FROM ??',
                ['id', 'name', locations]
            );

            return data;
        } catch (e) {
            console.log(e.message);
        }
    },
    async getLocationById(id) {
        try {
            const [data] = await this.getConnection().query(
                `SELECT * FROM ?? WHERE id = ?`,
                [locations, id]
            );

            return data[0];
        } catch (e) {
            console.log(e.message);
        }
    },
    async addLocation(item) {
        try {
            const data = await this.getConnection().query(
                'INSERT INTO ?? (name, description) VALUES (?, ?)',
                [locations, item.name, item.description]
            );

            return data[0];
        } catch (e) {
            console.log(e.message);
        }
    },
    async deleteLocation(id) {
        try {
            const [data] = await this.getConnection().query(
                'DELETE FROM ?? WHERE id = ?',
                [locations, id]
            );

            return data;
        } catch (e) {
            console.log(e.message);
        }
    },
    async editLocation(item, id) {
        try {
            const [data] = await this.getConnection().query(
                'UPDATE ?? SET ? WHERE id = ?',
                [locations, item, id]
            );
            return data;
        } catch (e) {
            console.log(e.message);
        }
    },

// Items
    async getItems() {
        try {
            const [data] = await this.getConnection().query(
                'SELECT ??, ??, ??, ?? FROM ??',
                ['id', 'name', 'category_id', 'location_id', accountingSubjects]
            );

            return data;
        } catch (e) {
            console.log(e.message);
        }
    },
    async getItemById(id) {
        try {
            const [data] = await this.getConnection().query(
                `SELECT * FROM ?? WHERE id = ?`,
                [accountingSubjects, id]
            );

            return data[0];
        } catch (e) {
            console.log(e.message);
        }
    },
    async addItem(item) {
        item.datetime = dayjs().format('YYYY-MM-DDTHH:mm:ss');

        try {
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
        } catch (e) {
            console.log(e.message);
        }
    },
    async deleteItem(id) {
        try {
            const [data] = await this.getConnection().query(
                'DELETE FROM ?? WHERE id = ?',
                [accountingSubjects, id]
            );

            return data;
        } catch (e) {
            console.log(e.message);
        }
    },
    async editItem(item, id) {
        try {
            const [data] = await this.getConnection().query(
                'UPDATE ?? SET ? WHERE id = ?',
                [accountingSubjects, item, id]
            );

            return data;
        } catch (e) {
            console.log(e.message);
        }
    },
};