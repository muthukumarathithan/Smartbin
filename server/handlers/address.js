const { db } = require("../models/users");
const request = require("request");
const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'google',
    apiKey: 'AIzaSyBmD3jjecPtoFL3rOCDNJEMxPBS1W9MsQc', 
    formatter: null 
  };
   
  const geocoder = NodeGeocoder(options);
  


exports.getAddress = async(req, res, next) =>{
    try {

        const res = await geocoder.reverse({ lat: 45.767, lon: 4.833 });
        console.log(res);

    } catch (error) {
        error.status = 400;
        next(error)
    }
} 

