const bookshelf = require('../config/bookshelf');

const Order = bookshelf.Model.extend({
    tableName: 'orders',
    products() {
        return this.hasMany('Product');
    }
});

const Product = bookshelf.Model.extend({
    tableName: 'products',
    orders: function () {
        return this.belongsToMany(Order, 'orders_products');
    }
});

const OrderProduct = bookshelf.Model.extend({
    tableName: 'orders_products',
    product() {
        return this.belongsTo(Product);
    },
    order() {
        return this.belongsTo(Order);
    }
})