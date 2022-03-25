module.exports = {
	/* 写原生的webpack命令 */
	configureWebpack: {
		resolve: {
			extensions: ['.js', '.vue', '.json'], // 可以省略的后缀名
			alias: {
				// 路径别名
				vue$: 'vue/dist/vue.esm.js', // 表示精准匹配 带vue编辑器
				'@': resolve(__dirname, '../src'), // 路径别名
				'@components': resolve(__dirname, './src/components'),
				'@pages': resolve(__dirname, '../src/assets/pages')
			}
		}
		/* 还可以配置proxy代理,如果有必要的话 */
	}
}
