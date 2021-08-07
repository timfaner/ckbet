module.exports = {
    runtimeCompiler: true,
    configureWebpack: {
        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: ['.ts', '.tsx', '.js', '.json'],

        },
        module: {
            rules: [

    
                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                { enforce: 'pre', test: /\.js\.map$/, loader: 'source-map-loader' },
    
                {
                    test: /\.tsx?$/,
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