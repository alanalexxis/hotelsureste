// webpack.config.js

module.exports = {
    // ...otras configuraciones de Webpack
  
    module: {
      rules: [
        {
          test: /\.pem$/,
          use: 'raw-loader',
        },
        // ...otras reglas
      ],
    },
  };
  