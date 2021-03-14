const db = require('../models');

exports.showDrivers = async(req, res, next) =>{
    try {
        const {id, user_type} = req.decoded;
        var filter = {}
        if(user_type === 2)
          filter = {distributor:id}
          else if(user_type === 3)
            filter = {dealer:id}
            else if(user_type === 4)
              filter = {customer:id}           
        const drivers = await db.Driver.find(filter)
        .populate('dealer')
        .populate('distributor');
        res.status(200).json(drivers)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 

exports.getDriver = async(req, res, next) =>{
    try {
        const {id} = req.params;
        const driver = await db.Driver.findById(id)
        .populate('dealers')
        .populate('distributors')
        .populate('vehicles');
        res.status(200).json(driver)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 


exports.createDriver = async(req, res, next) =>{
    try {
        const {id, user_type, user_id} = req.decoded;
        const customer = await db.Customer.findById(id);
        req.body.customer = id;
        console.log(customer);
        const driver =  await db.Driver.create({
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


exports.updateDriver = async(req, res, next) =>{
    try {
        const driver = await db.Driver.findById(req.params.id);
        if(!driver) throw new Error('No Driver found');
        driver.firstName = req.body.firstName;
        driver.lastName = req.body.lastName;
        driver.fullName = req.body.firstName+' '+req.body.lastName;
        driver.address = req.body.address;
        driver.mobile = req.body.mobile;
        driver.email = req.body.email;
        await driver.save(req.body);
        res.status(200).json(driver);
    } catch (error) {
        error.code = 400;
        next(error)
    }
}

exports.deleteDriver = async(req, res, next) =>{
    try {
        const {id:driverID} = req.params;
        const {id:userId, user_type } = req.decoded;
        const driver = await db.Driver.findById(driverID);
        if(user_type === 4 )
          await driver.remove()
         else throw new Error('Unauthorized access'); 
        res.status(200).json(driver)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 