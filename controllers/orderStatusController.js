const OrderStatus = require('../model/orderStatus');
const httpStatusCodes = require("http-status-codes");

exports.getAll = (req, res) => {
    OrderStatus.getAll().then(
        function (allOrderStatus) {
            res.status(httpStatusCodes.StatusCodes.OK);
            res.json(allOrderStatus);
        }
    );
};