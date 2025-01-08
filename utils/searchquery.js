const { Op } = require('sequelize');

exports.findLike = (object) => {
    return Object.keys(object).reduce((acc, key) => {
        acc[key] = { [Op.like]: `%${object[key]}%` };
        return acc;
    }, {});
}