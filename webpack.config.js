var path = require('path');

module.exports = {
    entry: [
        './client/src/app'
    ],
    output: {
        path: path.join(__dirname, 'client/build'),
        filename: 'index.js',
        publicPath: '/build/'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ["react-hot", "babel"],
            include: path.join(__dirname, 'client/src')
        }]
    }
};