

const webpack = require('webpack');
module.exports = {
    runtimeCompiler: true,
    configureWebpack: {
        plugins: [


            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
                // http: 'stream-http',
                // https: 'https-browserify',
                // os: 'os-browserify/browser',
                process: 'process/browser',
                // vm: 'vm-browserify'
            })
        ],
        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: ['.ts', '.tsx', '.js', '.json'],
            fallback: {
                assert: require.resolve('assert'),
                crypto: require.resolve('crypto-browserify'),
                fs: false,
                http: require.resolve('stream-http'),
                https: require.resolve('https-browserify'),
                os: require.resolve('os-browserify/browser'),
                process: require.resolve('process/browser'),
                stream: require.resolve('stream-browserify'),
                vm: require.resolve('vm-browserify')
            }

        },
        module: {

            rules: [

    
                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                //{ enforce: 'pre', test: /\.js\.map$/, loader: 'source-map-loader' },
    
                {
                    test: /\.ts|\.tsx?$/,
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.build.json',
                        projectReferences: true,
                        transpileOnly: true
                    }
                }
            ]
        }
      }
  }