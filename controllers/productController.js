const httpStatusCodes = require('http-status-codes');

Product = require('../model/product');

exports.getAll = (req, res) => {
    Product.getAll().then(
        function (allProducts) {
            res.status(httpStatusCodes.StatusCodes.OK);
            res.json(allProducts);
        }
    );
};

exports.getById = (req, res) => {
    Product.getById(req.params.id)
        .then(
            function (product) {
                res.status(httpStatusCodes.StatusCodes.OK);
                res.json(product);
        })
        .catch(
            function (error) {
                res.status(httpStatusCodes.StatusCodes.NOT_FOUND)
                res.send({
                    error: 'Produkt o podanym id nie istnieje'
                })
            }
        )
};

exports.store = (req, res) => {
    // Sprawdzenie poprawności danych
    if (req.body.price < 0) {
        res.status(httpStatusCodes.StatusCodes.BAD_REQUEST);
        res.send({
            error: 'Cena nie może być mniejsza niż 0'
        })
        return;
    }
    else if (req.body.weight < 0) {
        res.status(httpStatusCodes.StatusCodes.BAD_REQUEST);
        res.send({
            error: 'Waga nie może być mniejsza niż 0'
        })
        return;
    }
    else if (req.body.price === 0) {
        res.status(httpStatusCodes.StatusCodes.BAD_REQUEST);
        res.send({
            error: 'Cena nie może być równa 0'
        })
        return;
    }
    else if (req.body.weight === 0) {
        res.status(httpStatusCodes.StatusCodes.BAD_REQUEST);
        res.send({
            error: 'Waga nie może być równa 0'
        })
        return;
    }
    else if (req.body.description === '') {
        res.status(httpStatusCodes.StatusCodes.BAD_REQUEST);
        res.send({
            error: 'Produkt musi zawierać opis'
        })
        return;
    }
    else if (req.body.name === '') {
        res.status(httpStatusCodes.StatusCodes.BAD_REQUEST);
        res.send({
            error: 'Produkt musi zawierać nazwę'
        })
        return;
    }

    const newProduct = Product.create({
        'name': req.body.name,
        'description': req.body.description,
        'price': req.body.price,
        'weight': req.body.weight,
        'category': req.body.category
    }).then(
        function () {
            res.status(httpStatusCodes.StatusCodes.OK);
            res.json({
                'status':'saved',
                'product':newProduct
            });
        }
    );
};

exports.updateById = (req, res) => {
    Product.getById(req.body.product.id)
        .catch(
            function (error) {
                res.status(httpStatusCodes.StatusCodes.NOT_FOUND)
                res.send({
                    error: 'Produkt o podanym id nie istnieje'
                })
            }
        )


    // Sprawdzenie poprawności modyfikowanych danych
    if (req.body.product.price < 0) {
        res.status(httpStatusCodes.StatusCodes.BAD_REQUEST);
        res.send({
            error: 'Cena nie może być mniejsza niż 0'
        })
        return;
    }
    else if (req.body.product.weight < 0) {
        res.status(httpStatusCodes.StatusCodes.BAD_REQUEST);
        res.send({
            error: 'Waga nie może być mniejsza niż 0'
        })
        return;
    }
    else if (req.body.product.price === 0) {
        res.status(httpStatusCodes.StatusCodes.BAD_REQUEST);
        res.send({
            error: 'Cena nie może być równa 0'
        })
        return;
    }
    else if (req.body.product.weight === 0) {
        res.status(httpStatusCodes.StatusCodes.BAD_REQUEST);
        res.send({
            error: 'Waga nie może być równa 0'
        })
        return;
    }
    else if (req.body.product.description === '') {
        res.status(httpStatusCodes.StatusCodes.BAD_REQUEST);
        res.send({
            error: 'Produkt musi zawierać opis'
        })
        return;
    }
    else if (req.body.product.name === '') {
        res.status(httpStatusCodes.StatusCodes.BAD_REQUEST);
        res.send({
            error: 'Produkt musi zawierać nazwę'
        })
        return;
    }

    Product.update(req.body.product).then(
        function (product) {
            res.status(httpStatusCodes.StatusCodes.OK);
            res.json(product);
        }
    );
};