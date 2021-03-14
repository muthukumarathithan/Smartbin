const db = require('../models');

exports.showDistrict = async(req, res, next) =>{
    try {
        const {id, user_type} = req.decoded;
        var filter = {}
        if(user_type === 2)
          filter = {distributor:id}
          else if(user_type === 3)
            filter = {dealer:id}
            else if(user_type === 4)
              filter = {customer:id}
        const district = await db.District.find()
        .populate('distributor')
        .populate('dealer')
        .populate('customer');
        console.log(district);
        res.status(200).json(district) 
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 

exports.getDistrict= async(req, res, next) =>{
    try {
        const {id} = req.params;
        const district = await db.District.findById(id)
        .populate('distributor')
        .populate('dealer');
        console.log(district)
        res.status(200).json(district)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 



exports.createDistrict= async(req, res, next) =>{
    try {
        const {id} = req.decoded;
        const district =  await db.District.create({
            ...req.body,
            created_by:id,
         });
        res.status(200).json(district);
    } catch (error) {
        error.code = 400;
        next(error)
    }
}

exports.getUserDistrict = async(req, res, next) =>{
    try {
       
        const district = await db.District.find()
        .populate('customer',['name','id'])
        .populate('dealer',['name','id'])
        .populate('distributor',['name','id'])
        .populate('vehicle',['name','id']);
        res.status(200).json(district)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 


exports.updateDistrict = async(req, res, next) =>{
    try {
        const {id:userId, user_type} = req.decoded;
        const {id:districtId} = req.params;
        const district = await db.District.findById(districtId);
        if(!district) throw new Error('No Device found');
        if(user_type === 4){
            district.district = req.body.district;
        }
        if(user_type === 1 && req.body.distributor)
         device.distributor = req.body.distributor;
        if((user_type === 1 || user_type === 2) && req.body.dealer) 
         device.dealer = req.body.dealer;
        if((user_type === 2 || user_type === 3 ) && req.body.district) 
         device.district = req.body.district;
        await district.save();
        res.status(200).json(district);
       } catch (error) {
        error.status = 400;
        next(error)
    }
}


exports.deleteDistrict = async(req, res, next) =>{
    try {
        const {id:districtId} = req.params;
        const {id:userId, user_type } = req.decoded;
        const district = await db.District.findById(districtId);
        if(user_type <= 4 )
          await district.remove()
         else throw new Error('Unauthorized access'); 
        res.status(200).json(district)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 