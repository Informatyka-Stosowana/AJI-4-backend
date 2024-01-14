const bookshelf = require('../config/bookshelf');
const orderController = require('../controllers/orderController');

const Product = bookshelf.Model.extend({
    tableName: 'products'
});

const Order = bookshelf.Model.extend({
    tableName: 'orders',
    products() {
        return this.belongsToMany(Product)
    }
});

module.exports.getAll = () => {
    return Order.fetchAll({withRelated: 'products'});
};

module.exports.getById = (id) => {
    return new Order({'id': id}).fetch({withRelated: 'products'});
};

module.exports.getByUserName = (username) => {
    return new Order({'userName': username}).fetch();
};

module.exports.getByOrderStatus = (orderStatus) => {
    return new Order({'orderStatus': orderStatus}).fetch();
};

module.exports.create = (order) => {
    return new Order({
        approvalDate: order.approvalDate,
        orderStatus: order.orderStatus,
        userName: order.userName,
        email: order.email,
        phoneNumber: order.phoneNumber
    }).save();
};

module.exports.updateOrderStatus = (id, o) => {
    return new Order({'id': id}).save({
        orderStatus: o.orderStatus,
    });
};