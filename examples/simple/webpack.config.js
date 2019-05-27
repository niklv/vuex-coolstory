const { ProvidePlugin } = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.vue']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new ProvidePlugin({
            Vue: 'vue',
            VueLoader: 'vue-loader'
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin()
    ]
};
