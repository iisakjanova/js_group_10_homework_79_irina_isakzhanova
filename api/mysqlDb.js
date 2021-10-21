const mysql = require('mysql2/promise');
const config = require('./config');

let connection = null;

module.exports = {
    connect: async () => {
        connection = await mysql.createConnection(config.databaseOptions);
        console.log(`Connected! id=${connection.threadId}`);
    },
    getConnection: () => connection,

    async getCategories() {
        const [data] = await this.getConnection().query(
            'SELECT ??, ?? FROM ??',
            ['id', 'name', 'categories']
        );

        return data;
    },
    async getCategoryById(id) {
        const [data] = await this.getConnection().query(
            `SELECT * FROM ?? WHERE id = ?`,
            ['categories', id]
        );

        return data[0];
    },
    async addCategory(item) {
        const data = await this.getConnection().query(
            'INSERT INTO ?? (name, description) VALUES (?, ?)',
            ['categories', item.name, item.description]
        );

        return data[0];
    },
    async deleteCategory(id) {
        const [data] = await this.getConnection().query(
            'DELETE FROM ?? WHERE id = ?',
            ['categories', id]
        );

        return data;
    },
    async editCategory(item, id) {
        const [data] = await this.getConnection().query(
            'UPDATE ?? SET ? WHERE id = ?',
            ['categories', item, id]
        );
        return data;
    },
};