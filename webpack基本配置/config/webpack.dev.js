const { resolve } = require('path')
// 用于整合css为同一个文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 用于压缩css文件
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
// 用于js语法检查
const ESLintPlugin = require('eslint-webpack-plugin')
// 用于打包html文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 压缩js代码 , webpack5自带不需要安装 ,开发环境注释
// const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
    // 入口文件
    entry: resolve(__dirname, '../index.js'),
    /*  entry: { // 入口文件
         main: ['../src/js/main.js', '../index.html']
     }, */
    output: {
        // 出口
        filename: 'js/bundle.js', // 输出文件名
        path: resolve(__dirname, '../dist'), // 输出文件路径配置
        clean: true, // 每次打包前都清空dist文件夹
        publicPath: '/',
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // css文件进行兼容性处理, 将所有css文件打包为一个文件
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // importLoader配置借鉴于官网
                            importLoaders: 1,
                        },
                    },
                    'postcss-loader', // css兼容性处理
                ],
            },
            /* less文件转css文件, 进行兼容性处理, 与css文件打包为同一个文件 */
            {
                test: /\.less$/,
                use: [
                    // 将所有css文件打包为一个文件
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // importLoader配置借鉴于官网
                            importLoaders: 1,
                        },
                    },
                    'postcss-loader', // css兼容性处理
                    'less-loader', // less文件转为css文件
                ],
            },
            /* js兼容性处理 */
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'usage', // 按需引入需要使用polyfill
                                    corejs: {
                                        version: 3,
                                    }, // 解决warn
                                    targets: {
                                        // 指定兼容性处理哪些浏览器
                                        chrome: '58',
                                        ie: '10',
                                    },
                                },
                            ],
                        ],
                        cacheDirectory: true, // 开启babel缓存
                    },
                },
            },
            /* 打包样式文件中的图片资源 */
            {
                test: /\.(jpe?g|png|gif)$/i,
                type: 'asset',
                generator: {
                    filename: 'assets/img/[name][ext]', // 放入dist/assets/img 目录中
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 0 * 1024, // 超过0kb不转 base64
                    },
                },
            },
            /* 打包音频资源 */
            {
                test: /\.mp3$/i,
                type: 'asset',
                generator: {
                    filename: 'assets/audio/[name][ext]', // 放入dist/assets/audio 目录中
                },
            },

            /* 打包视频资源 */
            {
                test: /\.mp4$/i,
                type: 'asset',
                generator: {
                    filename: 'assets/video/[name][ext]', // 放入dist/assets/video 目录中
                },
            },

            /* 打包字体文件 */
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                type: 'asset',
                generator: {
                    filename: 'assets/font/[name][ext]', // 放入dist/assets/font 目录中
                },
            },

            /* 打包html中引用的资源 */
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                },
            },
        ],
    },
    optimization: {
        /* 取消以下配置的注释, 可以在开发环境下压缩css文件 */
        // minimize: true,

        /* 以下配置保证在生产环境下能够压缩css文件 */
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,
            // css压缩
            new CssMinimizerPlugin(),
            /* 似乎使用了CSS压缩就会造成在生产模式下webpack无法压缩js代码, 于是使用这一内置插件用以压缩js代码 */
            /* 开发环境下请注释掉下面的代码 */
            // new TerserPlugin({
            //     parallel: true, // 可省略，默认开启并行
            //     terserOptions: {
            //         toplevel: true, // 最高级别，删除无用代码
            //         ie8: true,
            //         safari10: true,
            //     }
            // })
        ],
    },
    cache: true, // 可省略，默认最优配置：生产环境，不缓存 false。开发环境，缓存到内存，memory
    // devtool: process.env.NODE_ENV === 'production' ? 'eval-cheap-module-source-map' : 'inline-source-map', // 生产环境和开发环境的配置
    devtool:
        process.env.NODE_ENV === 'production'
            ? 'eval-cheap-module-source-map'
            : 'inline-source-map', // 生产环境和开发环境的配置
    plugins: [
        new MiniCssExtractPlugin({
            // 输出到dist/assets/css目录,且文件名为10位hash值
            filename: 'assets/css/[name].css',
        }),
        new ESLintPlugin({
            context: resolve(__dirname), //指定文件根目录，类型为字符串
            extensions: 'js', // 指定需要检查的扩展名 ,默认js
            exclude: '/node_modules/', // 排除node_modules文件夹, 配置里可以只保留这一项
            fix: false, // 启用 ESLint 自动修复特性。 小心: 该选项会修改源文件。
            quiet: false, // 设置为 true 后，仅处理和报告错误，忽略警告
        }),
        new HtmlWebpackPlugin({
            template: resolve(__dirname, '../src/public/index.html'), // 以index.html为模板
        }),
    ],

    /* dev-serve 自动化编译 */
    devServer: {
        hot: true, // 热更新
        static: resolve(__dirname, '../src/assets'),
        compress: true, //是否启动压缩 gzip
        port: 8080, // 端口号
        open: true, // 是否自动打开浏览器
        client: {
            //在浏览器端打印编译进度
            progress: false,
        },
    },
}
