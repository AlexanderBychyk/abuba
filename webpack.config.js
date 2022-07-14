const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env) => {
  let isProd = env.production ? 'production' : 'development';
  return {
    mode: isProd,
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(scss|css)$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.(png)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/png/[hash][ext][query]'
          }
        },
        {
          test: /\.(svg)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/svg/[hash][ext][query]'
          }
        },
        {
          test: /\.(mp3|wav)$/,
          loader: 'file-loader'
        }
        // {
        //   test: /\.mp3$/,
        //   loader: 'asset/resource'
        // }
        // {
        //   test: /\.(mp3)$/i,
        //   type: 'asset/resource',
        //   generator: {
        //     filename: 'assets/sounds/[hash][ext][query]'
        //   }
        // }
      ]
    },
    plugins: [
      new HTMLWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html'
      })
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, '/src')
      },
      open: true,
      compress: true,
      port: 8080
    }
  };
};
