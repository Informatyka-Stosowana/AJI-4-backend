const bookshelf = require('../config/bookshelf');

const OrderStatus = bookshelf.Model.extend({
    tableName: 'orderStatus'
})

module.exports.getAll = () => {
    return OrderStatus.fetchAll();
};