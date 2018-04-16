module.exports = {
	root: true,
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module'
	},
	env: {
		browser: true,
	},
	extends: 'airbnb-base',
	plugins: [
		'html'
	],
	globals: {},
	rules: {
		// allow paren-less arrow functions
		'arrow-parens': 0,
		// allow async-await
		'generator-star-spacing': 0,
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
		// 缩进风格
		'indent': 0,
		// 文件末尾强制换行
		'eol-last': 0,
		// 分号结尾
		"semi": 0,
		// 函数名与()之间不能有空格
		"space-before-function-paren": 0
	}
}