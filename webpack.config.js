const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
module.exports={
    entry:'./src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
        publicPath: '/',
        assetModuleFilename: "assets/img/[hash][ext][query]",
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
            favicon:"./src/asserts/images/logo.ico",
        }),
        new MiniCssExtractPlugin(),
    ],
    module: {
        rules: [
            {                
                test: /\.(png|jpe?g|gif|svg)$/i,                   
                type: "asset",                                     
            },
            {                
                test: /\.(s[ac]|c)ss$/i,                
                use: [                  {                    
                loader: MiniCssExtractPlugin.loader,                                   options: { publicPath: "" },                  
                },                  
                "css-loader",                  
                "postcss-loader",                                                 
                "sass-loader",                                  
                ],              
                },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env',{ targets: "defaults", "debug":true, "useBuiltIns":"usage", "corejs":3 }], ['@babel/preset-react',{runtime:"automatic"}]]
                        }
                }
            },
        ]
    },
    devServer: {
        hot: true,
        port: 3000,
        open:true,
        historyApiFallback: true, 
        historyApiFallback: {
          disableDotRule: true
        },
        proxy: {       
            '/api': 'http://localhost:8000',          
           changeOrigin:true,
        },
    },
    

}