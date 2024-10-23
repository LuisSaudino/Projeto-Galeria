const path = require('path'); // Make sure to include this
const modoDev = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: modoDev ? 'development' : 'production',
    entry: './src/index.js',
    devServer: {
        static: {
            directory: path.join(__dirname, 'build'), // Correctly point to the build directory
        },
        port: 9001,
        hot: true,
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: true,
                    mangle: true,
                },
                parallel: true,
            }),
            new CssMinimizerPlugin(),
        ],
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'build'), // Use path.resolve for better compatibility
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'estilo.css' }),
        new CopyWebpackPlugin({
            patterns: [
                { from: '**/*.html', context: 'src/' },
                { from: 'imgs/**/*', context: 'src/' },
            ],
        }),
    ],
    module: {
        rules: [{
            test: /\.s?[ac]ss$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
            ],
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader'],
        }, {
            test: /\.(ttf|otf|eot|svg|woff(2)?)$/,
            use: ['file-loader'],
        }],
    },
};
