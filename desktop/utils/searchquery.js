exports.findLike = (object) => {
    return Object.keys(object).reduce((acc, key) => {
        acc[key] = { contains: String(object[key]) };
        return acc;
    }, {});
}