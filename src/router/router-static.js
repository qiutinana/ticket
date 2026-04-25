
import Vue from 'vue';
//配置路由
import VueRouter from 'vue-router'
Vue.use(VueRouter);
//1.创建组件
import Index from '@/views/index'
import Home from '@/views/home'
import Login from '@/views/login'
import NotFound from '@/views/404'
import UpdatePassword from '@/views/update-password'
import pay from '@/views/pay'
import register from '@/views/register'
import center from '@/views/center'
import Xitonggonggao from '@/views/modules/xitonggonggao/list';






import Guanliyuan from '@/views/modules/guanliyuan/list';
import Yuangong from '@/views/modules/yuangong/list';
import Gongren from '@/views/modules/gongren/list';
import Kehu from '@/views/modules/kehu/list';
import Dingdan from '@/views/modules/dingdan/list';
import Gongdan from '@/views/modules/gongdan/list';

//2.配置路由   注意：名字
export const routes = [{
    path: '/',
    name: '系统首页',
    component: Index,
    children: [{
        // 这里不设置值，是把main作为默认页面
        path: '/',
        name: '系统首页',
        component: Home,
        meta: { icon: '', title: 'center', affix: true }
    }, {
        path: '/updatePassword',
        name: '修改密码',
        component: UpdatePassword,
        meta: { icon: '', title: 'updatePassword' }
    }, {
        path: '/pay',
        name: '支付',
        component: pay,
        meta: { icon: '', title: 'pay' }
    }, {
        path: '/center',
        name: '个人信息',
        component: center,
        meta: { icon: '', title: 'center' }
    },





	{
		path: 'xitonggonggao',
		name: '系统公告',
		component: Xitonggonggao
	},
    
        {
            path: 'guanliyuan',
            name: '管理员',
            component: Guanliyuan
        },
        
        {
            path: 'yuangong',
            name: '员工',
            component: Yuangong
        },
        
        {
            path: 'gongren',
            name: '工人',
            component: Gongren
        },
        
        {
            path: 'kehu',
            name: '客户',
            component: Kehu
        },
        
        {
            path: 'dingdan',
            name: '订单',
            component: Dingdan
        },
        
        {
            path: 'gongdan',
            name: '工单',
            component: Gongdan
        },
        
    ]
},
{
    path: '/login',
    name: 'login',
    component: Login,
    meta: { icon: '', title: 'login' }
},
{
    path: '/register',
    name: 'register',
    component: register,
    meta: { icon: '', title: 'register' }
},
{
    path: '*',
    component: NotFound
}
]
//3.实例化VueRouter  注意：名字
const router = new VueRouter({
    mode: 'hash',
    /*hash模式改为history*/
    routes // （缩写）相当于 routes: routes
})
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export default router;

