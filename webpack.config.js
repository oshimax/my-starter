const path = require('path');
const MODE = "development";
const enabledSourceMap = MODE === "development";

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  mode: MODE,

  devtool: 'source-map',
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name]-[hash].js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { 'targets': '> 0.25%, not dead' }],
              ],
            },
          },
        ],
      },
      {
        test: /\.(css|sass|scss)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: true,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: enabledSourceMap,
              postcssOptions: {
                plugins: [
                  require('autoprefixer'),
                ],
              },
            },
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: enabledSourceMap,
            }
          },
        ],
      },
      {
        test: /\.(png|jpe?g|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: 'images/[name].[ext]',
              publicPath : '/'
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              pngquant: {
                quality: [0.65, 0.90],
              },
              imageminSvgo: ({
                plugins: [
                    {removeViewBox: false}
                ]
              })
            },
          },
        ],
      },
      {
        test: /\.pug/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/[name].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/index.pug',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/about.pug',
      filename: 'about.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/contact.pug',
      filename: 'contact.html',
    }),
    new CleanWebpackPlugin(),
  ],
}
