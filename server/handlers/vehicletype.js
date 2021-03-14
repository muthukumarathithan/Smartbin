const db = require('../models');

exports.showVehicletype = async(req, res, next) =>{
    try {
        const {id, user_type} = req.decoded;
        var filter = {}
        if(user_type === 2)
          filter = {distributor:id}
          else if(user_type === 3)
            filter = {dealer:id}
            else if(user_type === 4)
              filter = {customer:id}
        const vehicletype = await db.Vehicletype.find()
        .populate('distributor')
        .populate('dealer')
        .populate('customer');
        console.log(vehicletype);
        res.status(200).json(vehicletype) 
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 

exports.getVehicletype= async(req, res, next) =>{
    try {
        const {id} = req.params;
        const vehicletype = await db.Vehicletype.findById(id)
        .populate('distributor')
        .populate('dealer');
        console.log(vehicletype)
        res.status(200).json(vehicletype)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 



exports.createVehicletype= async(req, res, next) =>{
    try {
        const {id} = req.decoded;
        const vehicletype =  await db.Vehicletype.create({
            ...req.body,
            created_by:id,
         });
        res.status(200).json(vehicletype);
    } catch (error) {
        error.code = 400;
        next(error)
    }
}

exports.getUserVehicletype = async(req, res, next) =>{
    try {
       
        const vehicletype = await db.Vehicletype.find()
        .populate('customer',['name','id'])
        .populate('dealer',['name','id'])
        .populate('distributor',['name','id'])
        .populate('vehicle',['name','id']);
        res.status(200).json(vehicletype)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 


exports.updateVehicletype = async(req, res, next) =>{
    try {
        const {id:userId, user_type} = req.decoded;
        const {id:vehicletypeId} = req.params;
        const vehicletype = await db.Vehicletype.findById(vehicletypeId);
        if(!vehicletype) throw new Error('No Device found');
        if(user_type === 4){
            vehicletype.vehicletype = req.body.vehicletype;
        }
        if(user_type === 1 && req.body.distributor)
         device.distributor = req.body.distributor;
        if((user_type === 1 || user_type === 2) && req.body.dealer) 
         device.dealer = req.body.dealer;
        if((user_type === 2 || user_type === 3 ) && req.body.vehicletype) 
         device.vehicletype = req.body.vehicletype;
        await vehicletype.save();
        res.status(200).json(vehicletype);
       } catch (error) {
        error.status = 400;
        next(error)
    }
}


exports.deleteVehicletype = async(req, res, next) =>{
    try {
        const {id:vehicletypeId} = req.params;
        const {id:userId, user_type } = req.decoded;
        const vehicletype = await db.Vehicletype.findById(vehicletypeId);
        if(user_type <= 4 )
          await vehicletype.remove()
         else throw new Error('Unauthorized access'); 
        res.status(200).json(vehicletype)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 