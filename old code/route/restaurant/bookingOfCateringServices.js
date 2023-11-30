
const express = require('express')
const { } = require('../../middleware/jwt')
const { } = require('../../controller/admin/bookings')
const { } = require('../../controller/restaurant/bookings')
const { getbookingCateringServicebyRestaurant, getbookingCateringServicebyidbyRestaurant, getbookingCateringServiceByUserIdbyRestaurant, bookOfCateringServicesByRestaurant, upadteCateringServiceOfRestaurant, deleteCateringervicesByIdRestaurant } = require('../../controller/restaurant/bookingOfCateringServices')
module.exports = (app) => {
        app.get('/api/getbookingCateringServicebyRestaurant',/*Auth*/  getbookingCateringServicebyRestaurant);
        app.get('/api/getbookingCateringServicebyidbyRestaurant/:restaurantId',/*Auth*/  getbookingCateringServicebyidbyRestaurant);
        app.get('/api/getbookingCateringServiceByUserIdbyRestaurant/:userId',/*Auth*/  getbookingCateringServiceByUserIdbyRestaurant);
        app.post('/api/bookOfCateringServicesByRestaurant', /*Auth*/ bookOfCateringServicesByRestaurant);
        app.put('/api/upadteCateringServiceOfRestaurant/:id',/*Auth*/  upadteCateringServiceOfRestaurant);
        app.delete('/api/deleteCateringervicesByIdRestaurant/:id',/*Auth*/  deleteCateringervicesByIdRestaurant);
}