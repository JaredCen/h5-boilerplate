const path = require('path');

exports.resolve = (dir) => {
    return path.join(__dirname, '../', dir);
};

exports.assetsPath = (dir) => {
    return path.posix.join('static', dir);
};