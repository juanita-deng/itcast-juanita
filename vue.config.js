module.exports = {
	devServer: {
		open: true,
		port: 8887,
	},
	css: {
		loaderOptions: {
			css: {},
			postcss: {
				plugins: [
					require('postcss-px2rem')({
						//rem的单位：因为使用了lib-flexble会把所有的屏幕分成10等份
						//所以1rem就应该配置为设计图的1/10  640
						remUnit: 36, //(如果时两倍图，就把设计图缩小一半来量，避免使用第三方库造成影响)
					}),
				],
			},
		},
	},
	configureWebpack: {
		externals: {
			vue: 'Vue',
			'vue-router': 'VueRouter',
			axios: 'axios',
			lodash: '_',
		},
	},
};
