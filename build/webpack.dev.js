const {merge} = require('webpack-merge')
const path = require('path')
const baseConfig = require('./webpack.base')
const {HotModuleReplacementPlugin} = require('webpack')
module.exports = merge(baseConfig,{
    mode:'development',
    devtool:'eval-cheap-module-source-map',
    devServer:{
        port:3000,
        contentBase: path.join(__dirname, 'dist'),
        hot:true,
        stats:'errors-only', //终端仅打印error
        compress:true, //是否启用gzip压缩
        proxy:{
          '/api':{
            target:'http://0.0.0.0:80',
            pathRewrite: {
              '/api': '',
            },
          }
        }
      },
    plugins:[
      new HotModuleReplacementPlugin()
    ]
})