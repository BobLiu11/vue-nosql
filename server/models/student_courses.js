var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var student_coursesSchema = new Schema({
    SID:Number,
    CID:Number,
    SCORE:Number,
    TID:Number,
})


 module.exports = mongoose.model('student_courses',student_coursesSchema)