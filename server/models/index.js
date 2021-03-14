const mongoose = require('mongoose');
const port = process.env.DB_PORT;
const password = process.env.PASSWORD;
const username = process.env.USERNAME;
const db_name = process.env.DB_NAME;
const db_host = process.env.HOST;

mongoose.set('debug',true);
mongoose.Promise = global.Promise;

//mongoose.connect(`mongodb://kerala:keras140@34.93.249.144:27017/keralaDB`,{useNewUrlParser: true})

mongoose.connect(`mongodb://localhost:27017/smartDB`,{useNewUrlParser: true , useUnifiedTopology: true})
//mongoose.connect(`mongodb://localhost:27017/keralaDB`,{useNewUrlParser: true})
 .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

  module.exports.User = require('./users.js');
  module.exports.Poll = require('./polls.js');
  module.exports.Device = require('./devices.js');
  module.exports.Distributor = require('./distributors.js');
  module.exports.Dealer = require('./dealers.js');
  module.exports.Customer = require('./customers.js');
  module.exports.Vehicle = require('./vehicles.js');
  module.exports.Location = require('./locations.js');
  module.exports.Fence = require('./fences.js');
  module.exports.LatLng = require('./latlng.js');
  module.exports.Driver = require('./drivers.js');
  module.exports.Bin = require('./bins.js');
  module.exports.Zone = require('./zone.js');
  module.exports.District = require('./district.js');
  module.exports.Ward = require('./ward.js');
  module.exports.Vehicletype = require('./vehicletype.js');
  module.exports.House = require('./house.js');
  module.exports.Supervisor = require('./supervisor.js');
  module.exports.Employee = require('./employees.js');