/*
 * @Author: your name
 * @Date: 2021-08-05 18:56:25
 * @LastEditTime: 2021-08-05 22:57:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-cli/build/webpack.base.js
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const rootDir = process.cwd();
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  target: 'web',
  entry: {
    main:'./src/main.js',
  },
  
  output: {
    path: path.resolve(rootDir, 'dist'),
    filename: 'bundle.[contenthash:8].js',
  },
  optimization: {
    usedExports: true,
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      // `...`,
      new CssMinimizerPlugin(),
    ],
    minimize: true
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js|ts|tsx)$/,
        use: ['babel-loader','eslint-loader'],
        include: path.resolve(rootDir, 'src'),
        exclude: /node_modules/,
      },
      //解决css变量名冲突，
      {
        test: /\.(le|c)ss$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader',{
          loader:'postcss-loader',
          options:{
            postcssOptions:{
              plugins:[require('autoprefixer')]
            }
          },
        },{
          loader:'px2rem-loader',
          options:{
            remUnit:75,
            remPrecision:8,
          }
        }]
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        type: 'asset',
        parser:{
          dataUrlCondition:{
            //超过10kb转成 base64
            maxSize:10*1024
          }
        }
      },
      {
        test:/\.tsx?$/,
        use:'ts-loader',
        exclude:/node_modules/
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
        template:path.resolve(rootDir,'./public/index.html'),
        inject:'body',
        scriptLoading:'blocking'
    }),
    new CleanWebpackPlugin(),
    //将本地js打包
    new CopyWebpackPlugin({
      patterns:[
        {
          from: '*.js',
          context: path.resolve(rootDir, "public/js"),
          to: path.resolve(rootDir, 'dist/js'),
        }
      ]
    }),
    //抽离css
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ]
}