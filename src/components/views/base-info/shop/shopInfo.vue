<template>
  <div class="table">
    <div class="container">
        <div class="info-top-wrap">
            <div class="box-title">店铺基本信息</div>
            <div class="left-cont">
                <ul>
                    <li class="info-li">名称：zara</li>
                    <li class="info-li">当前合同号：1234560</li>
                    <li class="info-li">商场：高新区万象城</li>
                    <li class="info-li">商户：Zara</li>
                    <li class="info-li">业态：服饰</li>
                    <li class="info-li">经营模式：联营</li>
                    <li class="info-li">商铺：Zara商铺</li>
                    <li class="info-li">面积：200平方米</li>
                    <li class="info-li">品牌：Zara</li>
                </ul>
            </div>
            <div class="right-cont">
                <img class="yingye" src="../../../../assets/images/demo-yingye.jpg" alt="">
                <p class="right-title">营业执照</p>
            </div>
        </div>

        <div class="info-bottom-wrap">
            <div class="box-title">合同信息</div>
            <el-table :data="InfoData" border style="width: 100%">
                <el-table-column prop="contractId" label="合同号" width="150px" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="startTime" label="开始时间" width="100px" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="endTime" label="结束时间" width="150px" align="center"></el-table-column>
                <el-table-column prop="businessUser" label="商户" align="center"></el-table-column>
                <el-table-column prop="brand" label="品牌" width="80px" align="center"></el-table-column>
                <el-table-column prop="location" label="商铺位置" width="95px" align="center" > </el-table-column>
                <el-table-column prop="mode" label="经营模式" width="120px" align="center" > </el-table-column>
                <el-table-column prop="state" label="状态" width="100px" align="center" > </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                    <el-button size="mini" type="text" plain @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="text" plain @click="handleDelete(scope.$index, scope.row)">更多</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default{
    data(){
      return {
        currentPage:1,
        pagesize:5,
        idx:0,
        msg:'', 
        search: '',
        imgurl: require('../../../../assets/images/img-1.jpg'),
        InfoData: [
            {
                contractId: 1234560,
                startTime: '2019-06-26',
                endTime: '2020-06-30',
                businessUser: '吴亦凡',
                brand: 'zarara',
                location: 'A-130',
                mode: '租赁',
                state: '使用中' 
            }
        ]
      }
    },
    created(){
      this.getData();
    },
    computed:{
      tables:function(){
        var search=this.search;
        if(search){
          return  this.tableData.filter(function(dataNews){
            return Object.keys(dataNews).some(function(key){
              return String(dataNews[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
        return this.tableData
      }
    },
    methods:{
      getData(){
        // axios({
        //   url:"",
        //   method:"get",
        //   params:{
        //     token: localStorage.getItem("Authorization"),
        //   },
        //   headers:{
        //      'Content-type':'application/x-www-form-urlencoded'
        //   },
        //   data:[]
        // }).then(res=>{
        //   this.tableData = res.data.data;
        // });
      },
      handleSizeChange(val) {
        this.pagesize = val;
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      }

    }
  }
</script>

<style>
    .info-top-wrap {
        height: 300px;
        border: 1px solid #bac5d9;
        border-radius: 5px;
        position: relative;
    }
    .info-bottom-wrap {
        margin-top: 20px;
        height: 180px;
        border: 1px solid #bac5d9;
        border-radius: 5px;
    }
    .box-title {
        height: 32px;
        background: #bac5d9;
        color: #fff;
        font-size: 16px;
        font-weight: 600;
        line-height: 32px;
    }
    .left-cont {
        width: 700px;
        height: 248px;
        margin: 20px 0 0 20px;
    }
    .left-cont li {
        list-style: none;
        padding: 0;
        margin: 0;
        text-align: left;
        height: 32px;
        width: 300px;
        line-height: 32px;
        float: left;
        margin-bottom: 16px;
    }
    .right-cont {
        position: absolute;
        top: 46px;
        right: 30px;
        width: 200px;
        height: 220px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    .right-title {
        position: absolute;
        bottom: -26px;
        left: 70px;
    }
    .yingye {
        width: 160px;
        height: 220px;
    }
</style>