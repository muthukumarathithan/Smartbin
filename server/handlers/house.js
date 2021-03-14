const db = require('../models');

exports.showHouse = async(req, res, next) =>{
    try {
        const {id, user_type} = req.decoded;
        var filter = {}
        if(user_type === 2)
          filter = {distributor:id}
          else if(user_type === 3)
            filter = {dealer:id}
            else if(user_type === 4)
              filter = {customer:id}
        const house = await db.House.find()
        .populate('distributor')
        .populate('dealer')
        .populate('customer')
        .populate('ward');
        console.log(house);
        res.status(200).json(house) 
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 

exports.getHouse= async(req, res, next) =>{
    try {
        const {id} = req.params;
        const house = await db.House.findById(id)
        .populate('distributor')
        .populate('dealer')
        .populate('ward')
        console.log(house)
        res.status(200).json(house)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 



exports.createHouse= async(req, res, next) =>{
    try {
        const {id} = req.decoded;
        const house =  await db.House.create({
            ...req.body,
            created_by:id,
         });
        res.status(200).json(house);
    } catch (error) {
        error.code = 400;
        next(error)
    }
}

exports.getUserHouse = async(req, res, next) =>{
    try {
       
        const house = await db.House.find()
        .populate('customer',['name','id'])
        .populate('dealer',['name','id'])
        .populate('distributor',['name','id'])
        .populate('vehicle',['name','id']);
        res.status(200).json(house)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 


exports.updateHouse = async(req, res, next) =>{
    try {
        const {id:userId, user_type} = req.decoded;
        const {id:houseId} = req.params;
        const house = await db.House.findById(houseId);
        if(!house) throw new Error('No Device found');
        if(user_type === 4){
            house.houseName = req.body.houseName;
            house.houseowner = req.body.houseowner;
            house.mobile = req.body.mobile;
            house.address = req.body.address;
            house.ward = req.body.ward;
        }
        if(user_type === 1 && req.body.distributor)
         device.distributor = req.body.distributor;
        if((user_type === 1 || user_type === 2) && req.body.dealer) 
         device.dealer = req.body.dealer;
        if((user_type === 2 || user_type === 3 ) && req.body.house) 
         device.house = req.body.house;
        await house.save();
        res.status(200).json(house);
       } catch (error) {
        error.status = 400;
        next(error)
    }
}


exports.deleteHouse = async(req, res, next) =>{
    try {
        const {id:houseId} = req.params;
        const {id:userId, user_type } = req.decoded;
        const house = await db.House.findById(houseId);
        if(user_type <= 4 )
          await house.remove()
         else throw new Error('Unauthorized access'); 
        res.status(200).json(house)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 