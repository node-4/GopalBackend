const express = require('express')
const { } = require('../../middleware/jwt')
const {} = require('../../controller/admin/bookings')
const {bookServiceOfRestaurant,getbookingsbyRestaurant ,getbookingbyidbyRestaurant, upadtebookServiceOfRestaurant , deleteBookingByIdRestaurant} = require('../../controller/restaurant/bookings')
const {  } = require('../../controller/user/booking')
const bookingRouter = express.Router()

// //CUSTOMER
// bookingRouter.post('/bookService', /*Auth*/  bookService)
// // bookingRouter.get('/getbookingsbycustomer', /*Auth*/  getbookingsbycustomer)
// // bookingRouter.get('/getbookingbyidbycustomer/:id', /*Auth*/  getbookingbyidbycustomer)


// RESTAURANT
bookingRouter.post('/bookServiceOfRestaurant', /*Auth*/  bookServiceOfRestaurant)
bookingRouter.get('/getbookingsbyRestaurant', /*Auth*/  getbookingsbyRestaurant)
bookingRouter.get('/getbookingbyidbyRestaurant/:id', /*Auth*/  getbookingbyidbyRestaurant)
bookingRouter.put('/upadtebookServiceOfRestaurant/:id', /*Auth*/  upadtebookServiceOfRestaurant)
bookingRouter.delete('/deleteBookingByIdRestaurant/:id', /*Auth*/  deleteBookingByIdRestaurant)

module.exports = bookingRouter
