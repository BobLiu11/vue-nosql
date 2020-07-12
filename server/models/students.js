var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var studentSchema = new Schema({
    SID:Number,
    NAME:String,
    SEX:String,
    AGE:Number,
    BIRTHDAY:String,
    DNAME:String,
    CLASS:Number,
})
 module.exports = mongoose.model('Student',studentSchema)