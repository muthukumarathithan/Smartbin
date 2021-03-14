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

const EmployeeSchema = new Schema({
   firstName:String,
   lastName:String,
   full_name:String, 
   email:String,
   employee_code:String,
   employeetype:String,
   address:AddressSchema,
   mobile:String,
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

module.exports = mongoose.model('employees', EmployeeSchema);