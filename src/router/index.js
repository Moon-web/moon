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
let Wlbidding = resolve => void(require(['../components/wlbidding/wlbidding.vue'],resolve));
let biddingDetail = resolve => void(require(['../components/biddingDetail/biddingDetail.vue'],resolve));
let findCar = resolve => void(require(['../components/findCar/findCar.vue'],resolve));
let helpCenter =resolve => void(require(['../components/helpCenter/helpCenter.vue'],resolve));
let helpDetail = resolve => void(require(['../components/helpCenter/helpDetail/helpDetail.vue'],resolve));
let productDetail =resolve => void(require(['../components/productdetail/productdetail.vue'],resolve));
let search =resolve => void(require(['../components/searchResult/searchResult.vue'],resolve));
let groupDetail =resolve => void(require(['../components/groupDetail/groupDetail.vue'],resolve));
let newsList = resolve => void(require(['../components/newsList/newsList.vue'],resolve));
let newsItem = resolve => void(require(['../components/newsList/news-item/news-item.vue'],resolve));
let newsDetail = resolve => void(require(['../components/newsList/news-detail/news-detail.vue'],resolve));
let JcMoney = resolve=> void(require(['../components/JcMoney/JcMoney.vue'],resolve));
let enroll = resolve=> void(require(['../components/enroll/enroll.vue'],resolve));
let changePw = resolve=> void(require(['../components/changePw/changePw.vue'],resolve));
let complain = resolve=> void(require(['../components/complain/complain.vue'],resolve));
let brandList = resolve=> void(require(['../components/brandList/brandList.vue'],resolve));
let brandDetail = resolve=> void(require(['../components/brandDetail/brandDetail.vue'],resolve));
let bidList = resolve => void(require(['../components/bidList/bidList.vue'],resolve));
let bidDetail = resolve => void(require(['../components/bidDetail/bidDetail.vue'],resolve));
let bidEnroll = resolve => void(require(['../components/bidenroll/bidenroll.vue'],resolve));
let bidenrollMoney = resolve => void(require(['../components/bidenrollMoney/bidenrollMoney.vue'],resolve))
let order = resolve => void(require(['../components/order/order.vue'],resolve))
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
  },{
    path:'/helpCenter',
    name:'helpCenter',
    component:helpCenter,
    children:[
      {
        path:'/helpDetail',
        component:helpDetail,
      }
    ]
  },{
    path:'/productDetail',
    name:'productDetail',
    component:productDetail
  },{
    path:'/search',
    name:'search',
    component:search
  },{
    path:'/groupDetail',
    name:'groupDetail',
    component:groupDetail
  },{
    path:'/JcMoney',
    name:'JcMoney',
    component:JcMoney
  },{
    path:'/newsList',
    name:'newsList',
    component:newsList,
    children:[
      {
        path:'/newsItem',
        name:'newsItem',
        component:newsItem
      },{
        path:'/newsDetail',
        name:'newsDetail',
        component:newsDetail
      }
    ]
  },{
    path:'/enroll',
    name:'enroll',
    component:enroll
  },{
    path:'/changePw',
    name:'changePw',
    component:changePw
  },{
    path:'/login',
    name:'Login',
    component:Login
  },{
    path:'/register',
    name:'register',
    component:Register
  },{
    path:'/registerState',
    name:'registerState',
    component:RegisterState
  },{
    path:'/complain',
    name:'complain',
    component:complain
  },{
    path:'/ServiceOutside',
    name:'ServiceOutside',
    component:ServiceOutside
  },{
    path:'/brandList',
    name:'brandList',
    component:brandList
  },{
    path:'/brandDetail',
    name:'brandDetail',
    component:brandDetail
  },{
    path:'/bidList',
    name:'bidList',
    component:bidList
  },{
    path:'/bidDetail',
    name:'bidDetail',
    component:bidDetail
  },{
    path:'/bidEnroll',
    name:'bidEnroll',
    component:bidEnroll
  },{
    path:'/bidenrollMoney',
    name:'bidenrollMoney',
    component:bidenrollMoney
  },{
    path:'/order',
    name:'order',
    component:order
  }
];
let router = new Router({
  routes
});
export default router;
