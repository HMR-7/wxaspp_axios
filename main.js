import Vue from 'vue'
import App from './App'
import utils from './utils/utils' //公共工具方法
import routes from './static/routers/routers' //路径提取
import store from './store/index' //vuex状态管理文件
// Vue.prototype.$store = store;
Vue.prototype.$u = utils
Vue.prototype.$r = routes
Vue.config.productionTip = false
App.mpType = 'app'
//生产环境自动去除console.log打印
if (process.env.NODE_ENV !== 'development') {
    console.log = () => {}
}
const app = new Vue({
    ...App,
    store
})
app.$mount()