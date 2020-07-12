<template>
  <div class="table">
    <div class="container">
      <div class="handle-box top-select-box">
        <div class="select-input-wrapper">
          <span class="select-label">学号</span>
          <el-select class="select-input" placeholder="请选择" @change='selectIdentify' v-model="form.isIdentify" style="width: 100%;" >
              <el-option v-for="item in identifyList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <span class="select-label">姓名</span>
          <el-select class="select-input" @change='selectIdentify' v-model="form.isIdentify" style="width: 100%;">
              <el-option v-for="item in identifyList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="select-input-wrapper">
          <span class="select-label">班级</span>
          <el-select class="select-input" @change='selectIdentify' v-model="form.isIdentify" style="width: 100%;">
              <el-option v-for="item in identifyList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <span class="select-label">院系</span>
          <el-select class="select-input" @change='selectIdentify' v-model="form.isIdentify" style="width: 100%;">
              <el-option v-for="item in identifyList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
          <div class="top-button">
            <el-button type="primary" icon="search" @click="search">查询</el-button>
            <el-button type="primary" icon="search" @click="search">清空</el-button>
            <el-button type="primary" suffix-icon="add" @click="handleAdd">添加学生信息</el-button>
            <el-button type="primary" suffix-icon="add" @click="handleUpdate">更改学生信息</el-button>
          </div>
      </div>
      <el-table :data="tables.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%">
          <el-table-column prop="SID" label="学生学号" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="NAME" label="学生姓名"  align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="SEX" label="性别" align="center"></el-table-column>
          <el-table-column prop="AGE" label="年龄" align="center"></el-table-column>
          <el-table-column prop="BIRTHDAY" label="出生年月"  align="center"></el-table-column>
          <el-table-column prop="DNAME" label="院系"  align="center" > </el-table-column>
          <el-table-column prop="CLASS" label="班级"  align="center" > </el-table-column>
          <el-table-column label="操作"  align="center">
            <template slot-scope="scope">
              <el-button icon="el-icon-view" size="mini" type="text" plain @click="checkInfo(scope.$index, scope.row)">查看</el-button>
              <el-button icon="el-icon-edit" size="mini" type="text" plain @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button icon="el-icon-delete" size="mini" type="text" plain @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="currentPage" :page-sizes="[5,10,20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
        </el-pagination>
      </div>

      <!-- 添加弹出框 -->
      <el-dialog title="添加学生信息" :visible.sync="addVisible" width="40%">
        <el-form ref="form" :model="form" label-width="75px">
          <el-form-item label="学生学号">
            <el-input v-model="form.SID" clearable></el-input>
          </el-form-item>
          <el-form-item label="学生姓名">
            <el-input v-model="form.NAME" clearable></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="form.SEX" clearable></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.AGE" clearable></el-input>
          </el-form-item>
          <el-form-item label="出生年月">
            <el-input v-model="form.BIRTHDAY" clearable></el-input>
          </el-form-item>
          <el-form-item label="院系">
            <el-input v-model="form.DNAME" clearable></el-input>
          </el-form-item>
          <el-form-item label="班级">
            <el-input v-model="form.CLASS" clearable></el-input>
          </el-form-item> 
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button type="primary" @click="addStudent(form.SID,form.NAME,form.SEX,form.AGE,form.BIRTHDAY,form.DNAME,form.CLASS)">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 更改弹出框 -->
      <el-dialog title="更改学生信息" :visible.sync="updateVisible" width="40%">
        <el-form ref="form" :model="form" label-width="75px">
          <el-form-item label="学生学号">
            <el-input v-model="form.SID" clearable></el-input>
          </el-form-item>
          <el-form-item label="学生姓名">
            <el-input v-model="form.NAME" clearable></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="form.SEX" clearable></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.AGE" clearable></el-input>
          </el-form-item>
          <el-form-item label="出生年月">
            <el-input v-model="form.BIRTHDAY" clearable></el-input>
          </el-form-item>
          <el-form-item label="院系">
            <el-input v-model="form.DNAME" clearable></el-input>
          </el-form-item>
          <el-form-item label="班级">
            <el-input v-model="form.CLASS" clearable></el-input>
          </el-form-item> 
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="updateVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateStudent(form.SID,form.NAME,form.SEX,form.AGE,form.BIRTHDAY,form.DNAME,form.CLASS)">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 编辑弹出框 -->
      <el-dialog title="编辑" :visible.sync="editVisible" width="40%">
        <el-form ref="form" :model="form" label-width="75px">
          <el-form-item label="部门名称">
            <el-input v-model="form.groupName" clearable></el-input>
          </el-form-item>
          <el-form-item label="需要验证" >
            <el-select @change='selectIdentify' v-model="form.isIdentify" style="width: 100%;">
              <el-option v-for="item in identifyList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
				  </el-form-item>
          <el-form-item label="部门描述">
            <el-input type="textarea" v-model="form.description" clearable  rows='3' ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 删除提示框 -->
      <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
        <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="delVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteRow">确 定</el-button>
        </span>
      </el-dialog>

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
        studentObject:Object, 
        studentList:[],
        age:0,
        tableData: [],  
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
          SID:'',
          NAME:'',
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
        // axios.get("/students").then((response)=>{
        //   let res = response.data;
        //   if(res.status=="0"){
        //     this.studentsList = res.result
        //   }else{
        //     this.studentsList = []
        //   }
        // })
        // axios.get("./../../../../../static/json/student.json").then(this.handleStudentInfo)
        axios.get("/students").then(this.handleStudentInfo)
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
      //添加学生信息
      addStudent (SID,NAME,SEX,AGE,BIRTHDAY,DNAME,CLASS) {
          axios.post('/students/add',{
            SID:this.form.SID,
            NAME:this.form.NAME,
            SEX:this.form.SEX,
            AGE:this.form.AGE,
            BIRTHDAY:this.form.BIRTHDAY,
            DNAME:this.form.DNAME,
            CLASS:this.form.CLASS
          }).then((res)=>{
            if(res.status ==200){
              alert("添加成功")
            }else{
              alert("添加失败")
            }
          })
          this.addVisible = false;
      },
      //更改学生信息
      updateStudent (SID,NAME,SEX,AGE,BIRTHDAY,DNAME,CLASS) {
          //console.log(res.status)
          axios.post('/students/update',{
            SID:this.form.SID,
            NAME:this.form.NAME,
            SEX:this.form.SEX,
            AGE:this.form.AGE,
            BIRTHDAY:this.form.BIRTHDAY,
            DNAME:this.form.DNAME,
            CLASS:this.form.CLASS
          }).then((res)=>{
            if(res.status ==200){
              alert("修改成功")
              console.log(res.status)
            }else{
              alert("修改失败")
              console.log(res.status)
            }
          })
          this.updateVisible = false;
          //console.log(res.status)
      },

      handleStudentInfo (res) {
            res=res.data
            if(res.status=="0"){
              // for(var i=0,j=0;i<this.studentObject.length;i++){
              //   if(this.studentObject.student[i].AGE<20){
              //     this.studentList[j] = this.studentObject.student[i]
              //     j++
              //   }
              // }
             this.tableData = res.result.list
            }else{
              this.tableData = []
            }
      },
      
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
      },

      // 查看
      checkInfo(index, row) {
        this.$router.push({
          path:'shopInfo',
          // query:{shopID: 1}
        }) 
      },
      //编辑
      handleEdit(index, row) {
        this.idx = index;
        this.msg = row; 
        const item = this.msg;
        if(this.msg.IsNeedIdentify === "是"){
          this.msg.IsNeedIdentify = 1
        }else{
          this.msg.IsNeedIdentify = 0
        }
        this.form = {
          groupName: this.msg.GroupName,
          description: this.msg.GroupDescription,
          isIdentify: this.msg.IsNeedIdentify,
        }
        this.editVisible = true;
      },
      saveEdit() {
        axios({
          url:"http://211.87.227.223:8082/group/editGroup",
          method:"post",
          params:{
            token: localStorage.getItem("Authorization"),
            groupid: this.msg.GroupID,
            groupname: this.form.groupName,
            groupdescription: this.form.description,
            isneedidentify: this.form.isIdentify,
          },
          headers:{
            'Content-type':'application/x-www-form-urlencoded'
          }
        }).then(res=>{
          this.getData();
          this.$message.success(`修改成功`);
        }).catch(error=>{
          console.log(error)
          this.$message.success('修改失败');
        });
        this.editVisible = false;
      },

      //添加学生信息
      handleAdd(){
        this.addVisible = true;
      },
      //更改学生信息
      handleUpdate(){
        this.updateVisible = true;
      },
      saveAdd(){
        axios({
          // url:"http://211.87.227.223:8082/group/addGroup",
          url:'',
          method:"post",
          params:{
            token: localStorage.getItem("Authorization"),
            // groupname: this.form.groupName,
            // groupdescription: this.form.description,
            // isneedidentify: this.form.isIdentify,
            SID:this.form.SID,
            NAME:this.form.NAME,
            SEX:this.form.SEX,
            AGE:this.form.AGE,
            BIRTHDAY:this.form.BIRTHDAY,
            DNAME:this.form.DNAME,
            CLASS:this.form.CLASS
          },
          headers:{
            'Content-type':'application/x-www-form-urlencoded'
          }
        }).then(res=>{
          this.getData();
          this.$message.success('添加成功');
        }).catch(error=>{
          console.log(error)
          this.$message.success('添加失败');
        });
        this.addVisible = false;
      },

      //删除
      handleDelete(index, row) {
        this.idx = index;
        this.msg = row;  //每一条数据的记录
        this.delVisible = true;
      },
      deleteRow(){
        var groupID = this.msg.GroupID;
        axios({
          url:"http://211.87.227.223:8082/group/deleteGroup",
          method:"post",
          params:{
            groupID: groupID,
            token:localStorage.getItem("Authorization"),
          },
          headers:{
            'Content-type':'application/x-www-form-urlencoded'
          }
        }).then(res=>{
          this.getData();
          this.$message.success('删除成功');
        }).catch(error=>{
          console.log(error)
          this.$message.success('删除失败');
        });
        this.delVisible = false;
      } 
    }
  }
</script>

<style>
    .handle-box.top-select-box {
      margin-bottom: 50px;
      height: 160px;
    }
    .select-input-wrapper {
      margin-bottom: 40px;
      text-align: left;
    }
    .select-input {
      width: 280px !important;
      height: 20px;
      margin: 0 46px 0 16px;
    }
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