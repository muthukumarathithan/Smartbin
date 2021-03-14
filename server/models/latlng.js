var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LatLongSchema = new Schema({
full_address:  String  ,
lat: Number  ,
lng: Number
});


module.exports = mongoose.model('latlngs', LatLongSchema);
