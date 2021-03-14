const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BinSchema = new Schema({
   binId:Number,
   binName:String,
   latitude:Number,
   longitude:Number, 
   gpsDeviceId:Number,
   maxCapacity:Number,
   address:String,
   quantity:Number,
   bintype:String,
   bincategory:String,
   rfid1:String,
   rfid2:String,
   rfid3:String,
   ward:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ward'
        },
    vehicle:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'vehicles'
    },
   location: {
    type: {
      type: String, 
      enum: ['Point'], 
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
   created_by:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users'
    },
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'customers'
        },
    
   created:{
        type:Date,
        default:Date.now,
    },
   
})

BinSchema.index({ location: '2dsphere' });


module.exports = mongoose.model('bins', BinSchema);