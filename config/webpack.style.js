const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    base: "../src/assets/base.scss"
  },
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'css/[name].css'
  },
  watchOptions: {
    ignored: ['**/node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
            MiniCssExtractPlugin.loader,
            {
                loader: "css-loader",
                options:{
                    importLoaders: 2,
                    sourceMap: true,
                    url: true
                }
            },
            {
                loader: "postcss-loader",
                options: {
                    postcssOptions: {
                        plugins: [
                            require("autoprefixer")()
                        ]
                    },
                    sourceMap: true,
                }
            },
            {
                loader: "scss-loader",
                options: {
                    sourceMap: true
                }
            }
        ],
      },
      {
        test: /\.(png|jpg|jpeg)$/i,
        type: "assets/resource",
        generator: {
          filename: 'images/[name][ext]'
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        type: "assets/resource",
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
    ]    
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash]css",
      chunkFilename: "[id].css"
    }),
    // CleanWebpackPlugin
    //CopyPlugin
    //Webpack ManifestPlugin
  ],
};