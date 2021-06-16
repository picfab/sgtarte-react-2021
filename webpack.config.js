const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    // path to entry paint
    entry: {
      variables:'./src/assets/variables.js',
      main:'./src/index.js'
    },

    // path and filename of the final output
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js',
    },
    module:{
      rules:[
        {
          test:/\.js$/,
          use:'babel-loader',
          exclude:/node_modules/
        },
        {
          test:/\.css$/i,
          use:[
            {
            loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
          ]
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            "css-loader", // Translates CSS into CommonJS
            "sass-loader", // Compiles Sass to CSS
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
      new HtmlWebpackPlugin({
        title:'home',
        template:'./src/templatesHtml/index.html'
      }),
      new webpack.ProvidePlugin({
        'React':     'react'
      }),
      // new BundleAnalyzerPlugin()
    ],
    devServer: {
      contentBase: path.join(__dirname, "public"),
      historyApiFallback: true,
    },
    optimization:{
      splitChunks:{
        cacheGroups:{
          node_vendors:{
            test:/[\\/]node_modules[\\/]/,
            chunks:'all',
            priority:1
          }
        }
      }
    }

}
