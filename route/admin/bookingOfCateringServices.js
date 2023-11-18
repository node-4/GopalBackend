
const express = require('express')
const { } = require('../../middleware/jwt')
const { } = require('../../controller/admin/bookings')
const { } = require('../../controller/restaurant/bookings')
const { getbookingCateringServicebyAdmin, getbookingCateringServiceByUserIdbyAdmin, getbookingCateringServicebyRestaurantIdbyAdmin, bookOfCateringServicesByAdmin, upadteCateringServiceOfAdmin, deleteCateringervicesById } = require('../../controller/admin/bookingOfCateringServices')
const bookingRouter = express.Router()
module.exports = (app) => {
        app.get('/api/getbookingCateringServicebyAdmin', /*Auth*/ getbookingCateringServicebyAdmin);
        app.get('/api/getbookingCateringServiceByUserIdbyAdmin/:userId', /*Auth*/ getbookingCateringServiceByUserIdbyAdmin);
        app.get('/api/getbookingCateringServicebyRestaurantIdbyAdmin/:restaurantId', /*Auth*/ getbookingCateringServicebyRestaurantIdbyAdmin);
        app.post('/api/bookOfCateringServicesByAdmin', /*Auth*/ bookOfCateringServicesByAdmin);
        app.put('/api/upadteCateringServiceOfAdmin/:id', /*Auth*/ upadteCateringServiceOfAdmin);
        app.delete('/api/deleteCateringervicesById/:id', /*Auth*/ deleteCateringervicesById);
};
