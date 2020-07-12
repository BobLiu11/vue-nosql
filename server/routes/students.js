var express = require('express')
var router = express.Router();
var mongoose = require('mongoose')
var Student = require('../models/students')
var student_courses = require('../models/student_courses')
var courses = require('../models/courses')

mongoose.connect('mongodb://127.0.0.1:27017/user201934842')

mongoose.connection.on("connected",function(){
    console.log("MongoDB connected success")
})
mongoose.connection.on("error",function(){
    console.log("MongoDB connected fail")
})
mongoose.connection.on("disconnected",function(){
    console.log("MongoDB connected disconnected")
})

//查询学生信息
router.get("/",function(req,res,next){
    Student.find({},function(err,doc){
        if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else{
            res.json({
                status:'0',
                msg:'',
                result:{
                    count:doc.length,
                    list:doc
                }
            })
        }
    })
})

//添加一个学生信息路由
router.post("/add", (req, res) => {
    //Student model上的create方法储存数据
    Student.create(req.body, (err, student) => {
      if (err) {
        res.json({
            status:"201",
            msg:err.message
            });
      } else {
        res.json({
            student,
            status:'200',
        });
      }
    });
  })

//更新一条学生信息数据路由
router.post("/update", (req, res) => {
    for(var key in req.body){
        if(req.body[key] == ''){
            delete req.body[key];
        }
    }
    Student.findOneAndUpdate(
      { SID: req.body.SID},
      {
        $set: req.body
      },
      {new: true}).then(student => res.json(student)).catch(err => res.json(err));
  });

//查询所有学生选课情况
router.get("/student_courses",function(req,res,next){
    student_courses.find({},function(err,doc){
        if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else{
            res.json({
                status:'0',
                msg:'',
                result:{
                    count:doc.length,
                    list:doc
                }
            })
        }
    })
})

//按学号查询学生选课情况
router.post("/student_courses_find",function(req,res,next){
    let obj={'SID' :parseInt(req.body.SID) }
    student_courses.find(obj,function(err,doc){
        if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else{
            res.json({
                status:'0',
                msg:'',
                result:{
                    list:doc
                }
            })
        }
    })
})

//更新一条学生选课信息数据路由
router.post("/student_courses_update", (req, res) => {
    for(var key in req.body){
        if(req.body[key] == ''){
            delete req.body[key];
        }
    }
   student_courses.findOneAndUpdate(
      { SID: parseInt(req.body.SID)},
      {
        $set: req.body
      },
      {new: true}).then(student => res.json(student)).catch(err => res.json(err));
  });

//添加一个学生选课信息路由
router.post("/student_courses_add", (req, res) => {
    student_courses.create(req.body, (err, student_courses) => {
      if (err) {
        res.json({
            status:"201",
            msg:err.message
            });
      } else {
        res.json({
            student_courses,
            status:'200',
        });
      }
    });
})
//var coursesInfo = {}
//查询课程信息
router.get("/courses",function(req,res,next){
    courses.find({},function(err,doc){
        coursesInfo = doc 
        //console.log(coursesInfo)
        if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else{
            res.json({
                status:'0',
                msg:'',
                result:{
                    count:doc.length,
                    list:doc
                }
            })
        }

    })
})

//列出student_course表中出现过的所有课程名称
//先从student_course表中获取CID并去重，然后根据CID到course表中获取课程名
router.get("/coursesdis",function(req,res,next){
    student_courses.distinct('CID',function(err,doc){
        //console.log(doc)
        if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else{
            res.json({
                status:'0',
                msg:'',
                result:{
                    count:doc.length,
                    list:doc
                }
            })
        }
    })
 })

//选课人数排名前10的课程
router.get("/coursesCount",function(req,res,next){
    student_courses.aggregate([
    {
        $group:{
            _id:"$CID",
            count:{$sum:1}
        }
    },{
        $sort:{
            count:-1
        }
    },{
        $limit:10
    }
],function(err,doc){
        if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else{
           var docs = new Array(); 
           for(var i =0 ; i<doc.length;i++){ 
            (function(i){
                 courses.findOne({'CID': doc[i]._id},function(err,doc1){
                    // doc1['count']= doc[i].count
                    docs[i] = doc1;
                    if(i == 9){
                        res.json({
                            status:'0',
                            msg:'',
                            result:{
                                count:doc.length,
                                list:docs
                            }
                        })
                    }
                 })
            })(i);  
           } 
        }
    })
 })
module.exports = router;