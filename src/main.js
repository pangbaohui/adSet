import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './styles/taobao.scss'
import './styles/element-variables.scss'
import { post, get } from './http/axios'
import vdr from 'vue-draggable-resizable-gorkys'
import './icons' // icon
import echarts from 'echarts'
// 导入默认样式
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
Vue.component('vdr', vdr)

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$echarts = echarts

Vue.prototype.post = post
Vue.prototype.get = get
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
