var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var courseSchema = new Schema({
    CID:Number,
    NAME:String,
    FCID:Number,
    CREDIT:Number
})
 module.exports = mongoose.model('courses',courseSchema)