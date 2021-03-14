const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    line1:String,
    line2:String,
    city:String,
    state:String,
    country:String,
    zip:String
})

const HouseSchema = new Schema({
   ward:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ward'
        },
   houseowner:String,
   mobile:Number,
   address:AddressSchema,
   created_by:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users'
    },
   created:{
        type:Date,
        default:Date.now,
    },
   
})

module.exports = mongoose.model('house', HouseSchema);