const httpStatusCodes = require('http-status-codes');

const Category = require('../model/category');

exports.getAll = (req, res) => {
    Category.getAll().then(
        function (allCategories) {
            res.status(httpStatusCodes.StatusCodes.OK);
            res.json(allCategories);
        }
    );
};