module.exports = {
    ...require('./auth'),
    ...require('./poll'),
    ...require('./device'),
    ...require('./distributor'),
    ...require('./dealer'),
    ...require('./customer'),
    ...require('./vehicle'),
    ...require('./fence'),
    ...require('./ping'),
    ...require('./distance'),
    ...require('./history'),
    ...require('./address'),
    ...require('./driver'),
    ...require('./bin'),
    ...require('./zone'),
    ...require('./district'),
    ...require('./ward'),
    ...require('./vehicletype'),
    ...require('./house'),
    ...require('./supervisor'),
    ...require('./employee')

}

module.exports.notFound = (req, res, next)=>{
    const err = new Error('Not Found')
     err.status = 404;
     console.log(err);
     
     next(err);
      

}

module.exports.errors = (err, req, res, next)=>{
   res.status(err.status || 500).json({
       err : err.message || 'Something went wrong'
   })      

}