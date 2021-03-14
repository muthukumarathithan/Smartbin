const db = require('../models');
const moment = require('moment');


exports.showFences = async(req, res, next) =>{
    try {
      const {id, user_type} = req.decoded;
      if(user_type === 4){
            const fences = await db.Fence.find({customer:id})
            .populate('customer')
            .populate('fence')
            .populate('distributor');
            res.status(200).json(fences)     
         }
        else
         throw new Error('Unauthorized access'); 
    } catch (error) {
        error.status = 400;
        next(error)
    }
}


exports.createFence = async(req, res, next) =>{
    try {

        const {id, user_type, user_id} = req.decoded;
        const customer = await db.Customer.findById(id);
        req.body.customer = id;
        const fence =  await db.Fence.create({
            ...req.body,
            customer,
         });
        res.status(200).json(fence);
    } catch (error) {
        error.code = 400;
        next(error)
    }
}



exports.showCustomerFences = async(req, res, next) =>{
    try {
        console.log(req.decoded);
        
        const fencelist = await db.Fence.find({});
        var GeoFenceList = await fencelist.map((item)=>{
               return {
                createdAt : moment(item.createdAt).format('DD-MMM-YYYY hh:mm:ss A'),
                area_id:item.area_id,
                district_id:item.district_id,
                latitude:item.latitude,
                longitude:item.longitude,
                radius:item.radius,
                address:item.address,
                mobile_no:item.mobile_no,
              }
            });
           res.status(200).json({
            GeoFenceList:GeoFenceList
           })

    } catch (error) {
        error.status = 400;
        next(error)
    }
} 


exports.getFence = async(req, res, next) =>{
    try {
        const {id} = req.params;
        const fence = await db.Fence.findById(id);
        console.log(fence);          
        res.status(200).json(fence)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 

exports.deleteFence = async(req, res, next) =>{
    try {
        const {id:fenceID} = req.params;
        const {id:userId, user_type } = req.decoded;
        console.log(fenceID, userId)
        const fence = await db.Fence.findById(fenceID);
        console.log(fence)
        if(user_type === 4 )
          await fence.remove()
         else throw new Error('Unauthorized access'); 
        res.status(200).json(fence)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 
