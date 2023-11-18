
const express = require('express')
const { } = require('../../middleware/jwt')
const { } = require('../../controller/admin/bookings')
const { } = require('../../controller/restaurant/bookings')
const { bookService, getbookingsbycustomer } = require('../../controller/user/booking')
const bookingRouter = express.Router()




module.exports = (app) => {
        app.post('/api/bookService', /*Auth*/ bookService);
        app.get('/api/getbookingsbycustomer',/*Auth*/  getbookingsbycustomer);
        // bookingRouter.get('/getbookingbyidbycustomer/:id', /*Auth*/  getbookingbyidbycustomer)
}