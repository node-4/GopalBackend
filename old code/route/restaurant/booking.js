const express = require('express')
const { } = require('../../middleware/jwt')
const { } = require('../../controller/admin/bookings')
const { bookServiceOfRestaurant, getbookingsbyRestaurant, getbookingbyidbyRestaurant, upadtebookServiceOfRestaurant, deleteBookingByIdRestaurant } = require('../../controller/restaurant/bookings')
const { } = require('../../controller/user/booking')
const bookingRouter = express.Router()
module.exports = (app) => {
        // app.post('/api/bookService', /*Auth*/ bookService);
        // app.get('/api/getbookingsbycustomer',/*Auth*/  getbookingsbycustomer);
        // app.get('/api/getbookingbyidbycustomer/:id',/*Auth*/  getbookingbyidbycustomer);
        app.post('/api/bookServiceOfRestaurant', /*Auth*/ bookServiceOfRestaurant);
        app.get('/api/getbookingsbycustomer',/*Auth*/  getbookingsbyRestaurant);
        app.get('/api/getbookingbyidbyRestaurant/:id',/*Auth*/  getbookingbyidbyRestaurant);
        app.put('/api/upadtebookServiceOfRestaurant/:id',/*Auth*/  upadtebookServiceOfRestaurant);
        app.delete('/api/deleteBookingByIdRestaurant/:id',/*Auth*/  deleteBookingByIdRestaurant);
}