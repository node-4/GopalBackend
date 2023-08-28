const createError = require('http-errors');

const plantype = require('../../model/restaurantPlanType');

exports.getAllPlanTypeByUser = async (req, res, next) => {
    try {
        console.log('hit get PlanType which are for all the users');
        const dataplantype = await plantype.find()

        if (dataplantype.length === 0) return res.status(200).json({ message: 'no plantype found' });

        return res.status(200).send(dataplantype);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
} 


exports.getPlanTypeByIdByUser = async (req, res, next) => {
    try {
        console.log('hit get plantype which are for a particular user');

        const datacreated = await plantype.find({_id:req.params.id})

        if (datacreated.length === 0) return res.status(200).json({ message: 'no plantype found' });

        return res.status(200).json({datacreated});

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}
