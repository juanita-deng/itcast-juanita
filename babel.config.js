module.exports = {
	presets: ['@vue/cli-plugin-babel/preset'],
	//配置vant-ui
	plugins: [
		[
			'import',
			{
				libraryName: 'vant',
				libraryDirectory: 'es',
				style: true
			},
			'vant'
		]
	]
};
