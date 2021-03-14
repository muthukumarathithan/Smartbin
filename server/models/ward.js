const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WardSchema = new Schema({
    ward:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ward'
        },
   created_by:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users'
    },
   created:{
        type:Date,
        default:Date.now,
    },
   
})

module.exports = mongoose.model('ward', WardSchema);