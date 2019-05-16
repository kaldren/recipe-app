const path = require('path');

// {
//   entry: {
//     'dir1/js/bundle': path.resolve(__dirname, '/apps/dir1/js/main.js'),
//     'dir2/foo' : path.resolve(__dirname, '/apps/dir2/index.js')
//   },
//   output: {
//     path: path.resolve(__dirname, '/apps'),
//     filename: '[name].js'
//   },
//   ...
// }

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public/scripts'),
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        publicPath: '/scripts/'
    },
    devtool: 'source-map'
}