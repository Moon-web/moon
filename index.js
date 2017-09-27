import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/index.vue'
import IndexPage from '@/components/indexPage/indexPage.vue'

let Login  = resolve => void(require(['../components/login/login.vue'],resolve));
let Register = resolve=> void(require(['../components/register/register.vue'],resolve));
let RegisterState = resolve=> void(require(['../components/registerState/registerState.vue'],resolve));
let Trade  = resolve => void(require(['../components/trade/trade.vue'],resolve));
let Provincial = resolve => void(require(['../components/provincial/provincial.vue'],resolve));
let Logistics = resolve => void(require(['../components/logistics/logistics.vue'],resolve));
let Service = resolve => void(require(['../components/service/service.vue'],resolve));
let ServiceOutside = resolve =>void(require(['../components/serviceOutside/serviceOutside.vue'],resolve));
let Finance = resolve => void(require(['../components/finance/finance.vue'],resolve));
Vue.use(Router);

let routes =[
  {
    path: '/',
    name: 'parent',
    component: Index,
    redirect: '/index',
    children: [
      {
        path:'/index',
        component:IndexPage
      },
      {
        path:'/provincial',
        component:Provincial
      },{
        path: '/logistics',
        component: Logistics,
      },{
        path:'/service',
        component:Service
      },{
        path:'/finance',
        component:Finance
      },{
        path:'/trade',
        name:'Trade',
        component:Trade
      }
    ]
  },{
    path:'/wlbidding',
    name:'Wlbidding',
    component:Wlbidding
  },{
    path:'/biddingDetail',
    name:'biddingDetail',
    component:biddingDetail
  },{
    path:'/findCar',
    name:'findCar',
    component:findCar
  }
];
let router = new Router({
  routes
});
export default router;
