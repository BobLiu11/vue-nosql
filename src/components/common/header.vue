<template>
    <div class="header">
        <div class="logo">
            <p class="logo-title">NoSql可视化管理平台</p>
        </div>
        <div class="header-right">
            <div class="header-user-con">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <i class="icon-d-wo1"></i>
                            {{this.$store.state.UserName}}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <i class="el-icon-setting">
                                <router-link to="./setting">设置</router-link>
                            </i>
                        </el-dropdown-item>
                        <el-dropdown-item><i class="el-icon-back" @click="loginOut"> 退出</i> 
                        </el-dropdown-item>      
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <!-- <setting></setting> -->
    </div>
</template>
<script>
    import axios from 'axios'
    import bus from '../common/bus'
    //import Setting from './setting'
    export default {
        data() {
            return {
                collapse: false,
                fullscreen: false,
            }
        },
        // components:{
        //     Setting
        // },
        methods:{
            loginOut(){
                var is_loginout = confirm("您确定要退出吗？")
                if(is_loginout){
                    this.$router.replace('/login');
                    axios({
                        method: 'post',
                        url: 'http://211.87.227.223:8082/admin/logout',
                        params:{
                            token: localStorage.getItem("Authorization"),
                        },
                        headers:{
                            'Content-type':'application/x-www-form-urlencoded'
                        }
                    }).then(res=>{
                        this.$router.replace('/login')
                        localStorage.removeItem("Authorization")

                    }).catch(error=>{
                        console.log(error)
                    })
                }  
            }
        },
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;
        background:#242e42;
    }
    .logo {
        float: left;
        height: 30px;
        padding-right: 16px;
        margin-top: 20px;
        margin-left: 30px;
        background: url(../../assets/images/smalllogo.png) no-repeat;
        background-size: 30px 30px;
    }
    .logo-title{
        float: left;
        line-height: 34px;
        margin-left: 46px;
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 70px;
        align-items: center;
    }
    .user-name{
        margin-left: 10px;
    }
    .el-dropdown-link {
        color: #fff;
        font-size: 14px;
    }
    
</style>
