const httpStatusCodes = require('http-status-codes');
const bookshelf = require('../config/bookshelf')

const Order = require('../model/order');

exports.getAll = (req, res) => {
    Order.getAll().then(
        (allOrders) => {
            res.status(httpStatusCodes.StatusCodes.OK);
            res.json(allOrders);
        }
    )
    // .then((allOrders) => {
    //         allOrders.forEach((order) => {
    //             order.products.forEach((product) => {
    //                 delete product._pivot_order_id;
    //                 delete product._pivot_product_id;
    //             });
    //         });
    //         return allOrders;
    //     }
    // )
};

exports.getById = (req, res) => {
    Order.getById(req.params.id).then(
        function (order) {
            res.status(httpStatusCodes.StatusCodes.OK);
            res.json(order);
            return order;
        }
    ).then((orders) => {
            orders.forEach((order) => {
                order.products.forEach((product) => {
                    delete product._pivot_order_id;
                    delete product._pivot_product_id;
                })
                return orders;
            })
        }
    )
};

exports.getByUserName = (req, res) => {
    console.log('req.params.userName');
    Order.getByUserName(req.params.userName).then(
        function (order) {
            res.status(httpStatusCodes.StatusCodes.OK);
            res.json(order);
        }
    );
};

exports.getByOrderStatus = (req, res) => {
    Order.getByOrderStatus(req.params.orderStatus).then(
        function (order) {
            res.status(httpStatusCodes.StatusCodes.OK);
            res.json(order);
        }
    );
};

exports.store = (req, res) => {
    // Sprawdzenie, czy zamówienie zawiera nazwę użytkownika
    if (req.body.userName === '') {
        res.status(httpStatusCodes.StatusCodes.BAD_REQUEST);
        res.send({
            error: 'Zamówienie musi zawierać nazwę użytkownika'
        })
        return;
    }
    // Sprawdzenie poprawności numeru telefonu
    if (req.body.phoneNumber.length !== 9) {
        res.status(httpStatusCodes.StatusCodes.BAD_REQUEST);
        res.send({
            error: 'Niepoprawna długość numeru telefonu. Numer telefonu musi składać się z dziewięciu cyfr'
        })
        return;
    }
    for (let i = 0; i < req.body.phoneNumber.length; i++) {
        if (req.body.phoneNumber[i] !== '0' &&
            req.body.phoneNumber[i] !== '1' &&
            req.body.phoneNumber[i] !== '2' &&
            req.body.phoneNumber[i] !== '3' &&
            req.body.phoneNumber[i] !== '4' &&
            req.body.phoneNumber[i] !== '5' &&
            req.body.phoneNumber[i] !== '6' &&
            req.body.phoneNumber[i] !== '7' &&
            req.body.phoneNumber[i] !== '8' &&
            req.body.phoneNumber[i] !== '9') {
            res.status(httpStatusCodes.StatusCodes.BAD_REQUEST);
            res.send({
                error: 'Numer telefonu może zawierać tylko cyfry od 0 do 9'
            })
            return;
        }
    }

    const newOrder = Order.create({
        approvalDate: req.body.approvalDate,
        orderStatus: req.body.orderStatus,
        userName: req.body.userName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
    }).then(
        function () {
            res.status(httpStatusCodes.StatusCodes.OK);
            res.json({
                'status': 'saved',
                'order': newOrder
            });
        }
    );
};

exports.updateOrderStatus = (req, res) => {
    Order.getById(req.params.id)
        .then(
            function (order) {
                let status = order['attributes']['orderStatus'];
                let newStatus = req.body.orderStatus;

                if (status === 'ANULOWANE' && newStatus === 'ZREALIZOWANE') {
                    res.status(httpStatusCodes.StatusCodes.BAD_REQUEST)
                    res.send({
                        error: 'Nie można modyfikować stanu anulowanego zamówienia'
                    });
                    return;
                } else if (status === 'ANULOWANE' && newStatus === 'ZATWIERDZONE') {
                    res.status(httpStatusCodes.StatusCodes.BAD_REQUEST)
                    res.send({
                        error: 'Nie można modyfikować stanu anulowanego zamówienia'
                    });
                    return;
                } else if (status === 'ANULOWANE' && newStatus === 'NIEZATWIERDZONE') {
                    res.status(httpStatusCodes.StatusCodes.BAD_REQUEST)
                    res.send({
                        error: 'Nie można modyfikować stanu anulowanego zamówienia'
                    });
                    return;
                } else if (status === 'ZATWIERDZONE' && newStatus === 'NIEZATWIERDZONE') {
                    res.status(httpStatusCodes.StatusCodes.BAD_REQUEST)
                    res.send({
                        error: 'Nie można anulować zatwierdzenia zamówienia'
                    });
                    return;
                } else if (status === 'NIEZATWIERDZONE' && newStatus === 'ZREALIZOWANE') {
                    res.status(httpStatusCodes.StatusCodes.BAD_REQUEST)
                    res.send({
                        error: 'Nie można zrealizować niezatwierdzonego zamówienia'
                    });
                    return;
                } else if (status === 'ZREALIZOWANE' && newStatus === 'NIEZATWIERDZONE') {
                    res.status(httpStatusCodes.StatusCodes.BAD_REQUEST)
                    res.send({
                        error: 'Nie można modyfikować stanu zrealizowanego zamówienia'
                    });
                    return;
                } else if (status === 'ZREALIZOWANE' && newStatus === 'ZATWIERDZONE') {
                    res.status(httpStatusCodes.StatusCodes.BAD_REQUEST)
                    res.send({
                        error: 'Nie można modyfikować stanu zrealizowanego zamówienia'
                    });
                    return;
                } else if (status === 'ZREALIZOWANE' && newStatus === 'ANULOWANE') {
                    res.status(httpStatusCodes.StatusCodes.BAD_REQUEST)
                    res.send({
                        error: 'Nie można modyfikować stanu zrealizowanego zamówienia'
                    });
                    return;
                }

                Order.updateOrderStatus(req.params.id, req.body).then(
                    function (order) {
                        res.status(httpStatusCodes.StatusCodes.OK);
                        res.json(order);
                    }
                )
            })
        .catch(
            function (error) {
                res.status(httpStatusCodes.StatusCodes.NOT_FOUND)
                res.send({
                        error: 'Zamówienie o podanym id nie istnieje'
                    }
                )
            })
};