const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SupervisorSchema = new Schema({
    ward:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ward'
        },
   supervisorName:String,
   mobile:Number,
   GPSDeviceId:Number,
   created_by:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users'
    },
   created:{
        type:Date,
        default:Date.now,
    },
   
})

module.exports = mongoose.model('supervisor', SupervisorSchema);