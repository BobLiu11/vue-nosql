<template>
  <div class="table">
    <div class="container">
      <el-table :data="tables.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%">
          <el-table-column prop="CID" label="课程号" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="NAME" label="课程名"  align="center" :show-overflow-tooltip="true"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="currentPage" :page-sizes="[5,10,20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
        </el-pagination>
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
        CID:'',
        CNAME:'',
        studentObject:Object, 
        studentList:[],
        age:0,
        tableData: [], 
        calssNameDate:[], 
        classNameAndCID:[],
        TenClassName:[],
        classAllInfo:[],
        editVisible: false,
        delVisible: false,
        addVisible: false,
        updateVisible: false,
        identifyList:[{
            "id": 1,
            "name": "是"
          },{
            "id": 0,
            "name": "否"
          },
        ],
        form:{
          groupName:'',
          droneNum:'',
          pilotNum:'',
          isIdentify:'',
          description:'',
          _id:'',
          count:'',
          SID:'',
          CID:'',
          NAME:'',
          FCID:'',
          CREDIT:'',
          SEX:'',
          AGE:'',
          BIRTHDAY:'',
          DNAME:'',
          CLASS:''
        },
      }
    },
    created(){
      this.getData();
      //this.getClassNameData();
      //this.getTenClassNameData()
    },
    // beforeMount (){
    //     this.getData();
    // },
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
      },
    //   tableTen:function(){
    //     var search=this.search;
    //     if(search){
    //       return  this.TenClassName.filter(function(dataNews){
    //         return Object.keys(dataNews).some(function(key){
    //           return String(dataNews[key]).toLowerCase().indexOf(search) > -1
    //         })
    //       })
    //     }
    //     return this.TenClassName
    //   },

    },
    methods:{
    //     getTenClassNameData(){
    //     axios.get("/students/coursesCount").then(this.handleTenclassInfo)
    //   },
      getData(){
        axios.get("/students/coursesCount").then(this.handleStudentInfo)
      },
    //   getClassNameData(){
    //     axios.get("/students/coursesdis").then(this.handleclassInfo)
    //   },
    handleTenclassInfo (res) {
            res=res.data
            if(res.status=="0"){
             this.TenClassName = res.result.list
             console.log(this.TenClassName[0]._id)
            }else{
              this.TenClassName = []
            }
      },
    // handleclassInfo (res) {
    //         res=res.data
    //         if(res.status=="0"){
    //          this.calssNameDate = res.result.list
    //          //console.log(this.calssNameDate.length)
    //         }else{
    //           this.calssNameDate = []
    //         }
    //   },
      handleStudentInfo (res) {
            res=res.data
            if(res.status=="0"){
                this.tableData = res.result.list
                //console.log(this.tableData[0].course[0].CID)
                //this.tableData=this.studentList
            }else{
                this.tableData = []
            }
      },
    //  handleInfo(tableData,TenClassName){
    //      for(var i=0;i<TenClassName.length;i++){
    //          var TenCID = TenClassName[i]._id
    //          for(var j=0;j<tableData.length;i++){
    //             var tableCID=tableData[0].course[j].CID
    //             if(TenCID==tableCID){
    // //                 this.classNameAndCID[i].CID=CID
    // //                 this.classNameAndCID[i].CNAME=classAllInfo[j].CNAME
    //                 studentlist[i]=tableData[0].course[j]
    //              }
    //          }
    //      }
    //      console.log(studentlist)
    //  },
    // handleClassNameAndCID (calssNameDate,classAllInfo) {
    //     calssNameDate=this.calssNameDate
    //     classAllInfo=this.classAllInfo
    //     //console.log(classAllInfo)
    //     for(var i=0;i<calssNameDate.length;i++){
    //         var CID = calssNameDate[i]
    //         for(var j=0;j<classAllInfo.length;i++){
    //             if(CID==classAllInfo[j].CID){
    //                 this.classNameAndCID[i].CID=CID
    //                 this.classNameAndCID[i].CNAME=classAllInfo[j].CNAME
    //             }
    //         }
    //     }
    //     console.log(this.classNameAndCID)
    // },

      selectIdentify(vId){
        let obj = {};
        obj = this.identifyList.find((item)=>{
          return item.id === vId; 
        });
        this.form.isIdentify = vId;
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
    .top-button {
      margin-top: 20px;
      text-align: left;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
</style>