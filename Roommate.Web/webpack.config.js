const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: [
        './index.js',
        __dirname + '/wwwroot/styles.scss'
    ],
    output: {
        path: path.join(__dirname, 'wwwroot'),
        filename: 'bundle.js',
    },
    devServer: {
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'resolve-url-loader','sass-loader?sourceMap'])
            },
            {
                test: /\.png|jpg$/,
                loaders: ['url-loader?limit=8192&name=images/[name].[ext]&emitFile=false'],
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'styles.bundle.css',
            allChunks:true
        })
    ],
    resolve: {
        modules: [
            path.join(__dirname, 'node_modules')
        ]
    }
};