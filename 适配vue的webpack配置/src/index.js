/* 引入全部css文件 */
require.context('./assets/css', false, /^\.\/.*\.css/)

// /* 引入全部less文件 */
// require.context('./src/assets/less', false, /^\.\/.*\.less/)

// /* 引入全部js文件 */
// const ctx = require.context('./src/assets/components', false, /^\.\/.*\.js/)
// ctx.keys().forEach((item) => {
//     ctx(item).default
// })

// /* 引入全部html模板 */
// // 打包的时候，此代码不进行打包
import Vue from 'vue'
import App from '@/App.vue'
if (process.env.NODE_ENV === 'development') {
    import('./public/index.html')
}

const vm = new Vue({
    components: {
        App,
    },
    template: '<App/>',
}).$mount('#app')
