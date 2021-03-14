const db = require('../models');

exports.getHistory = async(req, res, next) =>{
    try {
        const history = await db.Location.find({ device_time : { $gte: new Date(req.body.start_time), $lte: new Date(req.body.end_time) },
        device_id : req.body.device_id}).sort({device_time: -1});
       res.status(200).json(history);
    } catch (error) {
        next(error)
    }
}

