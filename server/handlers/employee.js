const db = require('../models');

exports.showEmployees = async(req, res, next) =>{
    try {
        const {id, user_type} = req.decoded;
        var filter = {}
        if(user_type === 2)
          filter = {distributor:id}
          else if(user_type === 3)
            filter = {dealer:id}
            else if(user_type === 4)
              filter = {customer:id}           
        const employees = await db.Employee.find()
        .populate('dealer')
        .populate('distributor')
        .populate('ward');
        res.status(200).json(employees)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 

exports.getEmployee = async(req, res, next) =>{
    try {
        const {id} = req.params;
        const employee = await db.Employee.findById(id)
        .populate('dealers')
        .populate('distributors')
        .populate('vehicles')
        .populate('ward');
        res.status(200).json(employee)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 


exports.createEmployee = async(req, res, next) =>{
    try {
        const {id, user_type, user_id} = req.decoded;
        const customer = await db.Customer.findById(id);
        req.body.customer = id;
        console.log(customer);
        const employee =  await db.Employee.create({
            ...req.body,
            customer,
            dealer:customer.dealer,
            distributor:customer.distributor
         });
        res.status(200).json(employee);
    } catch (error) {
        error.code = 400;
        next(error)
    }
}


exports.updateEmployee = async(req, res, next) =>{
    try {
        const employee = await db.Employee.findById(req.params.id);
        if(!employee) throw new Error('No Employee found');
        employee.firstName = req.body.firstName;
        employee.lastName = req.body.lastName;
        employee.fullName = req.body.firstName+' '+req.body.lastName;
        employee.address = req.body.address;
        employee.mobile = req.body.mobile;
        employee.email = req.body.email;
        employee.ward = req.body.ward;
        employee.employeetype = req.body.employeetype;
        employee.employee_code = req.body.employee_code;
        await employee.save(req.body);
        res.status(200).json(employee);
    } catch (error) {
        error.code = 400;
        next(error)
    }
}

exports.deleteEmployee = async(req, res, next) =>{
    try {
        const {id:EmployeeID} = req.params;
        const {id:userId, user_type } = req.decoded;
        const employee = await db.Employee.findById(EmployeeID);
        if(user_type === 4 )
          await employee.remove()
         else throw new Error('Unauthorized access'); 
        res.status(200).json(employee)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 