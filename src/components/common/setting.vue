<template>
    <div class="header">
        <div class="header-username">
            <span>用户名：</span>
            <input v-model="username">
        </div>
        <div class="header-username">
            <span>密码：</span>
            <input v-model="pw1">
        </div>
        <div class="header-username">
            <span>确认密码：</span>
            <input v-model="pw2">
        </div>
    </div>
</template>
<script>
export default {
    name:'Setting',
    data () {
        return {
            username:'',
            pw1:'',
            pw2:''
        }
    }
}
</script>
<style lang="stylus" scoped>
    .header
        background :#eee
        fontsize:40px
</style>