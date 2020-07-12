import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect:'/home'
    },
    {
      path: '/',
      component: resolve => require(['../components/common/home.vue'], resolve),
      // meta: { title: '无人机管理', requiresAuth:true },
      children:[
        {
          path: '/home',
          component: resolve=>require(['../components/views/index/index.vue'],resolve),
          meta:{ 
            title: '主页',
            // requiresAuth: true 
          },
        },
        {
          path:'/shop',
          component: resolve=>require(['../components/views/base-info/shop/shop.vue'],resolve),
          meta:{ 
            title: '学生信息',
            // requiresAuth: true 
          },
        },
        {
          path:'/shopInfo',
          component: resolve=>require(['../components/views/base-info/shop/shopInfo.vue'],resolve),
          meta:{ 
            title: '修改学生信息',
            // requiresAuth: true 
          },
        },
        {
          path: '/store',
          component: resolve=>require(['../components/views/store/store.vue'], resolve),
          meta:{
            title:'课程管理',
            // requiresAuth: true 
          }
        },
        {
          path: '/location',
          component: resolve=>require(['../components/views/location/location.vue'], resolve),
          meta:{
            title:'选课中心',
            // requiresAuth: true 
          }
        },
        {
          path: '/classes',
          component: resolve=>require(['../components/views/base-info/shop/classes.vue'], resolve),
          meta:{
            title:'课程中心',
            // requiresAuth: true 
          }
        },
        {
          path: '/cost',
          component: resolve=>require(['../components/views/costCenter/cost.vue'], resolve),
          meta:{
            title:'费用中心',
            // requiresAuth: true 
          }
        },
        {
          path: '/statistic',
          component: resolve=>require(['../components/views/statistic/statistic.vue'], resolve),
          meta:{
            title:'报表中心',
            // requiresAuth: true 
          }
        },
        {
          path: '/role',
          component: resolve=>require(['../components/views/system/role.vue'], resolve),
          meta:{
            title:'角色管理',
            // requiresAuth: true 
          }
        },{
          path: '/permission',
          component: resolve=>require(['../components/views/system/permission.vue'], resolve),
          meta:{
            title:'权限管理',
            // requiresAuth: true 
          }
        },
        {
          path: '/login-control',
          component: resolve=>require(['../components/views/system/login-control.vue'], resolve),
          meta:{
            title:'后台登录管理',
            // requiresAuth: true 
          }
        },{
          path: '/admin-setting',
          component: resolve=>require(['../components/views/system/admin-setting.vue'], resolve),
          meta:{
            title:'管理员设置',
            // requiresAuth: true 
          }
        },{
          path: '/log',
          component: resolve=>require(['../components/views/system/log.vue'], resolve),
          meta:{
            title:'日志管理',
            // requiresAuth: true 
          }
        },{
          path: '/ip-control',
          component: resolve=>require(['../components/views/system/ip-control.vue'], resolve),
          meta:{
            title:'访问ip控制',
            // requiresAuth: true 
          }
        },{
          path: '/help',
          component: resolve=>require(['../components/views/system/help.vue'], resolve),
          meta:{
            title:'使用帮助',
            // requiresAuth: true 
          }
        },
        {
          path: '/setting',
          component: resolve=>require(['../components/common/setting.vue'], resolve),
          meta:{
            title:'设置',
            // requiresAuth: true 
          }
        }
        ]
    },
    {
      path:'/login',
      component: resolve=>require(['../components/views/account/login.vue'], resolve)
    }
  ]
})


//使用router.beforeEach注册一个全局前置守卫，判断用户是否登录
//前置路由守卫判断目标路由是否携带相关meta信息以及token是否存在
router.beforeEach((to, from, next)=>{ 
  let token = window.localStorage.getItem('Authorization')
  //requireAuth为路由中定义的 meta:{requireAuth:true}
  if(to.matched.some(record=>record.meta.requiresAuth) && (!token || token===null)){
    next({
      path:'/login',  //未登录定向到登录页面
      query:{redirect:to.fullPath}  //将跳转的路由path作为参数，登录成功后跳转到该路由
    })
  }
  else{
    next()  //直接放行
  }

})

export default router