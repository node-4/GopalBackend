
const express = require('express')
const { } = require('../../middleware/jwt')
const {} = require('../../controller/admin/bookings')
const { } = require('../../controller/restaurant/bookings')
const {bookOfCateringServices,getbookingCateringServicebycustomer,getbookingCateringServicebyidbycustomer} = require('../../controller/user/bookingOfCateringServices')
const bookingRouter = express.Router()

//CUSTOMER
bookingRouter.post('/bookOfCateringServices', /*Auth*/  bookOfCateringServices)
bookingRouter.get('/getbookingCateringServicebycustomer', /*Auth*/  getbookingCateringServicebycustomer)
bookingRouter.get('/getbookingCateringServicebyidbycustomer/:id', /*Auth*/  getbookingCateringServicebyidbycustomer)


module.exports = bookingRouter