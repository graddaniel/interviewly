const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');


const config = {
    entry: './index.tsx',
    module: {
        rules: [
            {
                test: /\.tsx$|\.ts$/i,
                use: ["ts-loader"],
                exclude: /node_modules/,
            },{
                test: /\.css$/i,
                use: [
                  "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                        // Run `postcss-loader` on each CSS `@import` and CSS modules/ICSS imports, do not forget that `sass-loader` compile non CSS `@import`'s into a single file
                        // If you need run `sass-loader` and `postcss-loader` on each CSS `@import` please set it to `2`
                            importLoaders: 1,
                            modules: {
                                localIdentName:'[name]__[local]--[hash:base64:5]',
                            },
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js", ".tsx"],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './public/index.html'
        }),
        new Dotenv(),
    ],
    devServer: {
        historyApiFallback: true,
        //https: true,
    },
    externals: {
        
    },
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
      config.mode = 'development';
    }
  
    if (argv.mode === 'production') {
        config.mode = 'production';
    }
  
    return config;
};