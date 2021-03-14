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

const DriverSchema = new Schema({
   firstName:String,
   lastName:String,
   full_name:String, 
   email:String,
   license_no:String,
   employee_code:String,
   address:AddressSchema,
   mobile:String,
   valid:{
    type:Date,
   },
   dob:{
    type:Date,
  },
   distributor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'distributors'
    },
    dealer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'dealers'
        },
        customer:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'customers'
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

module.exports = mongoose.model('drivers', DriverSchema);