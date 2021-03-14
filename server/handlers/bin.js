const db = require('../models');

exports.showBin = async(req, res, next) =>{
    try {
        const {id, user_type} = req.decoded;
        var filter = {}
        if(user_type === 2)
          filter = {distributor:id}
          else if(user_type === 3)
            filter = {dealer:id}
            else if(user_type === 4)
              filter = {customer:id}
        const bin = await db.Bin.find()
        .populate('distributor')
        .populate('dealer')
        .populate('customer')
        .populate('ward')
        .populate('vehicle');
        console.log(bin);
        res.status(200).json(bin) 
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 

exports.getBin = async(req, res, next) =>{
    try {
        const {id} = req.params;
        const bin = await db.Bin.findById(id)
        .populate('distributor')
        .populate('dealer')
        .populate('ward')
        .populate('vehicle');
        console.log(bin)
        res.status(200).json(bin)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 

exports.createBin = async(req, res, next) =>{
    try {
        const {id, user_type, user_id} = req.decoded;
        const customer = await db.Customer.findById(id);
        req.body.location = {
            type:'Point',
            coordinates: [req.body.latitude, req.body.longitude]
        }
        const driver =  await db.Bin.create({
            ...req.body,
            customer,
            dealer:customer.dealer,
            distributor:customer.distributor
         });
        res.status(200).json(driver);
    } catch (error) {
        error.code = 400;
        next(error)
    }
}

exports.getUserBin = async(req, res, next) =>{
    try {
       
        const bin = await db.Bin.find()
        .populate('customer',['name','id'])
        .populate('dealer',['name','id'])
        .populate('distributor',['name','id'])
        .populate('vehicle',['name','id']);
        res.status(200).json(bin)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 


exports.updateBin = async(req, res, next) =>{
    try {
        const {id:userId, user_type} = req.decoded;
        const {id:binId} = req.params;
        const bin = await db.Bin.findById(binId);
        if(!bin) throw new Error('No Device found');
        if(user_type === 4){
            bin.binId = req.body.binId;
            bin.latitude = req.body.latitude;
            bin.binName = req.body.binName;
            bin.longitude = req.body.longitude;
            bin.gpsDeviceId = req.body.gpsDeviceId;
            bin.maxCapacity = req.body.maxCapacity;
            bin.location = req.body.location;
            bin.quantity = req.body.quantity;
            bin.ward = req.body.ward;
            bin.bintype = req.body.bintype;
            bin.bincategory = req.body.bincategory;
            bin.rfid1 = req.body.rfid1;
            bin.rfid2 = req.body.rfid2;
            bin.rfid3 = req.body.rfid3;
            bin.vehicle = req.body.vehicle;
        }
        if(user_type === 1 && req.body.distributor)
         device.distributor = req.body.distributor;
        if((user_type === 1 || user_type === 2) && req.body.dealer) 
         device.dealer = req.body.dealer;
        if((user_type === 2 || user_type === 3 ) && req.body.bin) 
         device.bin = req.body.bin;
        await bin.save();
        res.status(200).json(bin);
       } catch (error) {
        error.status = 400;
        next(error)
    }
}


exports.deleteBin = async(req, res, next) =>{
    try {
        const {id:binId} = req.params;
        const {id:userId, user_type } = req.decoded;
        const bin = await db.Bin.findById(binId);
        if(user_type <= 4 )
          await bin.remove()
         else throw new Error('Unauthorized access'); 
        res.status(200).json(bin)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 