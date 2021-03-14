const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ZoneSchema = new Schema({
   zoneName:String,
   district:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'district'
    },
   operation:String,
   created_by:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users'
    },
   created:{
        type:Date,
        default:Date.now,
    },
   
})

module.exports = mongoose.model('zone', ZoneSchema);