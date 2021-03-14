var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FenceSchema = new Schema({
    fence_name:String,
    lat:Number,
    lng:Number,
    radius:Number,
    mobile_no:Number,
    address:String,
    customer:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'customers'
    },
    vehicles:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"vehicles"
    }],
    createdAt :{
      type : Date,
      default : new Date()
    }
});


module.exports = mongoose.model('fences', FenceSchema);
