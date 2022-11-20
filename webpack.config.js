const { dirname } = require('path');
const path = require('path');
const entries = require("./config/entries")
const TerserPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
module.exports = {
  entry: entries.entry,
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: 'js/[name].[contentHash].js',
    publicPath: "/build/",
    chunkFilename: "js/[id].chunk.[contenthash].js"
  },
  watchOptions: {
    ignored: ['**/node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env"]
            }
        }],
      },
    ]    
  },
  optimization: {
    runtimeChunk: "single",
    moduleIds: 'deterministic',
    minimizer: [
        new TerserPlugin({
            terserOptions: {
                keep_classnames: true,
                keep_fnames: true,
                format: {
                    comments: false
                }
            },
            extractComments: false
        })
    ]
  },
  plugins: [
    new WebpackManifestPlugin ({
        publicPath: "",
        basePath: "js/",
        fileName: "js/manifest.json",
        map: file =>{
            if (file.name.includes("util")){
                if(file.name.includes("map")){
                    file.name = "js/util.js.map";
                } else {
                    file.name = "js/util.js"
                }
            }
            return file;
        }
    })
  ]
};