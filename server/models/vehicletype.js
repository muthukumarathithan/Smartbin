const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VehicletypeSchema = new Schema({
   vehicletype:String,
   created_by:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users'
    },
   created:{
        type:Date,
        default:Date.now,
    },
   
})

module.exports = mongoose.model('vehicletype', VehicletypeSchema);