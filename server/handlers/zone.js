const db = require('../models');

exports.showZone = async(req, res, next) =>{
    try {
        const {id, user_type} = req.decoded;
        var filter = {}
        if(user_type === 2)
          filter = {distributor:id}
          else if(user_type === 3)
            filter = {dealer:id}
            else if(user_type === 4)
              filter = {customer:id}
        const zone = await db.Zone.find()
        .populate('distributor')
        .populate('dealer')
        .populate('customer')
        .populate('district');
        console.log(zone);
        res.status(200).json(zone) 
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 

exports.getZone= async(req, res, next) =>{
    try {
        const {id} = req.params;
        const zone = await db.Zone.findById(id)
        .populate('distributor')
        .populate('dealer')
        .populate('district');
        console.log(zone)
        res.status(200).json(zone)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 



exports.createZone= async(req, res, next) =>{
    try {
        const {id} = req.decoded;
        const zone =  await db.Zone.create({
            ...req.body,
            created_by:id,
         });
        res.status(200).json(zone);
    } catch (error) {
        error.code = 400;
        next(error)
    }
}

exports.getUserZone = async(req, res, next) =>{
    try {
       
        const zone = await db.Zone.find()
        .populate('customer',['name','id'])
        .populate('dealer',['name','id'])
        .populate('distributor',['name','id'])
        .populate('vehicle',['name','id']);
        res.status(200).json(zone)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 


exports.updateZone = async(req, res, next) =>{
    try {
        const {id:userId, user_type} = req.decoded;
        const {id:zoneId} = req.params;
        const zone = await db.Zone.findById(zoneId);
        if(!zone) throw new Error('No Device found');
        if(user_type === 4){
            zone.zoneName = req.body.zoneName;
            zone.district = req.body.district;
            zone.operation = req.body.operation;
        }
        if(user_type === 1 && req.body.distributor)
         device.distributor = req.body.distributor;
        if((user_type === 1 || user_type === 2) && req.body.dealer) 
         device.dealer = req.body.dealer;
        if((user_type === 2 || user_type === 3 ) && req.body.zone) 
         device.zone = req.body.zone;
        await zone.save();
        res.status(200).json(zone);
       } catch (error) {
        error.status = 400;
        next(error)
    }
}


exports.deleteZone = async(req, res, next) =>{
    try {
        const {id:zoneId} = req.params;
        const {id:userId, user_type } = req.decoded;
        const zone = await db.Zone.findById(zoneId);
        if(user_type <= 4 )
          await zone.remove()
         else throw new Error('Unauthorized access'); 
        res.status(200).json(zone)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 