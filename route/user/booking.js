
const express = require('express')
const { } = require('../../middleware/jwt')
const {} = require('../../controller/admin/bookings')
const { } = require('../../controller/restaurant/bookings')
const { bookService ,getbookingsbycustomer} = require('../../controller/user/booking')
const bookingRouter = express.Router()

//CUSTOMER
bookingRouter.post('/bookService', /*Auth*/  bookService)
bookingRouter.get('/getbookingsbycustomer', /*Auth*/  getbookingsbycustomer)
// bookingRouter.get('/getbookingbyidbycustomer/:id', /*Auth*/  getbookingbyidbycustomer)


module.exports = bookingRouter
