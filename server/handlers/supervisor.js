const db = require('../models');

exports.showSupervisor = async(req, res, next) =>{
    try {
        const {id, user_type} = req.decoded;
        var filter = {}
        if(user_type === 2)
          filter = {distributor:id}
          else if(user_type === 3)
            filter = {dealer:id}
            else if(user_type === 4)
              filter = {customer:id}
        const supervisor = await db.Supervisor.find()
        .populate('distributor')
        .populate('dealer')
        .populate('customer')
        .populate('ward');
        console.log(supervisor);
        res.status(200).json(supervisor) 
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 

exports.getSupervisor= async(req, res, next) =>{
    try {
        const {id} = req.params;
        const supervisor = await db.Supervisor.findById(id)
        .populate('distributor')
        .populate('dealer')
        .populate('ward');
        console.log(supervisor)
        res.status(200).json(supervisor)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 



exports.createSupervisor= async(req, res, next) =>{
    try {
        const {id} = req.decoded;
        const supervisor =  await db.Supervisor.create({
            ...req.body,
            created_by:id,
         });
        res.status(200).json(supervisor);
    } catch (error) {
        error.code = 400;
        next(error)
    }
}

exports.getUserSupervisor = async(req, res, next) =>{
    try {
       
        const supervisor = await db.Supervisor.find()
        .populate('customer',['name','id'])
        .populate('dealer',['name','id'])
        .populate('distributor',['name','id'])
        .populate('vehicle',['name','id'])
        .populate('ward',['name','id']);
        res.status(200).json(supervisor)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 


exports.updateSupervisor = async(req, res, next) =>{
    try {
        const {id:userId, user_type} = req.decoded;
        const {id:supervisorId} = req.params;
        const supervisor = await db.Supervisor.findById(supervisorId);
        if(!supervisor) throw new Error('No Device found');
        if(user_type === 4){
            supervisor.ward = req.body.ward;
            supervisor.supervisorName = req.body.supervisorName;
            supervisor.mobile = req.body.mobile;
            supervisor.GPSDeviceId = req.body.GPSDeviceId;
            supervisor.ward = req.body.ward;
        }
        if(user_type === 1 && req.body.distributor)
         device.distributor = req.body.distributor;
        if((user_type === 1 || user_type === 2) && req.body.dealer) 
         device.dealer = req.body.dealer;
        if((user_type === 2 || user_type === 3 ) && req.body.supervisor) 
         device.supervisor = req.body.supervisor;
        await supervisor.save();
        res.status(200).json(supervisor);
       } catch (error) {
        error.status = 400;
        next(error)
    }
}


exports.deleteSupervisor = async(req, res, next) =>{
    try {
        const {id:supervisorId} = req.params;
        const {id:userId, user_type } = req.decoded;
        const supervisor = await db.Supervisor.findById(supervisorId);
        if(user_type <= 4 )
          await supervisor.remove()
         else throw new Error('Unauthorized access'); 
        res.status(200).json(supervisor)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 