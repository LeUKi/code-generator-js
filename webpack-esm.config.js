const path = require('path');
module.exports = {
    entry: './src/index.ts',
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle-esm.js',
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.ts']
    },
    experiments: {
        outputModule: true
    }
}