// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import {Carousel,CarouselItem,DatePicker,Notification,Message,Collapse,CollapseItem,Upload,Dialog} from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'vue-awesome-swiper/node_modules/swiper/dist/css/swiper.min.css'
import VueLazyload from 'vue-lazyload'


Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(Carousel);
Vue.use(DatePicker);
Vue.use(Upload);
Vue.use(Dialog);
Vue.use(CarouselItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(VueLazyload,{
  preLoad: 1.3,
  error: 'static/common/normal-picture.png',
  loading:'static/common/normal-picture.png',
  attempt: 1
});
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
