const db = require('../models');

exports.showWard = async(req, res, next) =>{
    try {
        const {id, user_type} = req.decoded;
        var filter = {}
        if(user_type === 2)
          filter = {distributor:id}
          else if(user_type === 3)
            filter = {dealer:id}
            else if(user_type === 4)
              filter = {customer:id}
        const ward = await db.Ward.find()
        .populate('distributor')
        .populate('dealer')
        .populate('customer');
        console.log(ward);
        res.status(200).json(ward) 
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 

exports.getWard= async(req, res, next) =>{
    try {
        const {id} = req.params;
        const ward = await db.Ward.findById(id)
        .populate('distributor')
        .populate('dealer');
        console.log(ward)
        res.status(200).json(ward)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 



exports.createWard= async(req, res, next) =>{
    try {
        const {id} = req.decoded;
        const ward =  await db.Ward.create({
            ...req.body,
            created_by:id,
         });
        res.status(200).json(ward);
    } catch (error) {
        error.code = 400;
        next(error)
    }
}

exports.getUserWard = async(req, res, next) =>{
    try {
       
        const ward = await db.Ward.find()
        .populate('customer',['name','id'])
        .populate('dealer',['name','id'])
        .populate('distributor',['name','id'])
        .populate('vehicle',['name','id']);
        res.status(200).json(ward)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 


exports.updateWard = async(req, res, next) =>{
    try {
        const {id:userId, user_type} = req.decoded;
        const {id:wardId} = req.params;
        const ward = await db.Ward.findById(wardId);
        if(!ward) throw new Error('No Device found');
        if(user_type === 4){
            ward.wardName = req.body.wardName;
        }
        if(user_type === 1 && req.body.distributor)
         device.distributor = req.body.distributor;
        if((user_type === 1 || user_type === 2) && req.body.dealer) 
         device.dealer = req.body.dealer;
        if((user_type === 2 || user_type === 3 ) && req.body.ward) 
         device.ward = req.body.ward;
        await ward.save();
        res.status(200).json(ward);
       } catch (error) {
        error.status = 400;
        next(error)
    }
}


exports.deleteWard = async(req, res, next) =>{
    try {
        const {id:wardId} = req.params;
        const {id:userId, user_type } = req.decoded;
        const ward = await db.Ward.findById(wardId);
        if(user_type <= 4 )
          await ward.remove()
         else throw new Error('Unauthorized access'); 
        res.status(200).json(ward)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 