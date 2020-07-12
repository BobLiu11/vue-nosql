<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                <i :class="subItem.icon"></i>{{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-news',
                        index: 'home',
                        title: '主页'
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: '1',
                        title: '学生信息',
                        subs:[
                            {   icon: 'el-icon-edit',
                                index: 'shop',
                                title: '学生管理'
                            }
                        ]
                    },

                    {
                        icon: 'el-icon-star-on',
                        index: '2',
                        title: '课程管理',
                        subs:[
                            {
                                icon: 'el-icon-edit',
                                index:'store',
                                title:'课程信息管理'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: 'classes',
                        title: '课程名称管理',
                        subs:[
                            {
                                icon: 'el-icon-edit',
                                index:'classes',
                                title:'课程名称管理'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-view',
                        index: 'cost',
                        title: '选课中心',
                        subs:[
                            {
                                icon: 'el-icon-edit',
                                index:'location',
                                title:'学生选课管理'
                            }
                        ]
                    },
                    // {
                    //     icon: 'el-icon-view',
                    //     index: 'statistic',
                    //     title: '授课中心',
                    //     subs:[
                    //         {
                    //             icon: 'el-icon-edit',
                    //             index:'location',
                    //             title:'教师授课管理'
                    //         }
                    //     ]
                    // },
                    {
                        icon: 'el-icon-setting',
                        index: '8',
                        title: '系统设置',
                        subs: [
                            {
                                icon: 'el-icon-edit',
                                index: 'role',
                                title: '角色管理'
                            },{
                                icon: 'el-icon-edit',
                                index: 'permission',
                                title: '权限管理'
                            },{
                                icon: 'el-icon-edit',
                                index: 'login-control',
                                title: '后台登录管理'
                            },{
                                icon: 'el-icon-edit',
                                index: 'admin-setting',
                                title: '管理员设置'
                            },{
                                icon: 'el-icon-edit',
                                index: 'log',
                                title: '日志管理'
                            },{
                                icon: 'el-icon-edit',
                                index: 'ip-control',
                                title: '访问IP控制'
                            },{
                                icon: 'el-icon-edit',
                                index: 'help',
                                title: '使用帮助'
                            }
                        ]
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            // bus.$on('collapse', msg => {
            //     this.collapse = msg;
            // })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu {
        text-align: left;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 200px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
