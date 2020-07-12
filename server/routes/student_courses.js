var express = require('express')
var router = express.Router();
//var app = express();
var mongoose = require('mongoose')
var student_courses = require('../models/student_courses')

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

router.get("/",function(req,res,next){
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
           // console.log(res.json.result)
        }
    })
})

// 添加一个信息路由
// router.post("/", (req, res) => {
//     //Student model上的create方法储存数据
//     Student.create(req.body, (err, student) => {
//       if (err) {
//         res.json({
//             status:"201",
//             msg:err.message
//             });
//       } else {
//         res.json({
//             student,
//             status:'200',
//         });
//       }
//     });
//   })

//   //更新一条信息数据路由
// router.post("/update", (req, res) => {
//     for(var key in req.body){
//         if(req.body[key] == ''){
//             delete req.body[key];
//         }
//     }
//     Student.findOneAndUpdate(
//       { SID: req.body.SID},
//       {
//         $set: req.body
//       },
//       {new: true}).then(student => res.json(student)).catch(err => res.json(err));
//   });

module.exports = router;