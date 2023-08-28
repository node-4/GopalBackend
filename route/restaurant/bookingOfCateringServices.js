
const express = require('express')
const { } = require('../../middleware/jwt')
const {} = require('../../controller/admin/bookings')
const { } = require('../../controller/restaurant/bookings')
const {getbookingCateringServicebyRestaurant,getbookingCateringServicebyidbyRestaurant , getbookingCateringServiceByUserIdbyRestaurant ,bookOfCateringServicesByRestaurant , upadteCateringServiceOfRestaurant ,deleteCateringervicesByIdRestaurant} = require('../../controller/restaurant/bookingOfCateringServices')
const bookingRouter = express.Router()

//RESTAURANT

bookingRouter.get('/getbookingCateringServicebyRestaurant', /*Auth*/  getbookingCateringServicebyRestaurant)
bookingRouter.get('/getbookingCateringServicebyidbyRestaurant/:restaurantId', /*Auth*/  getbookingCateringServicebyidbyRestaurant)
bookingRouter.get('/getbookingCateringServiceByUserIdbyRestaurant/:userId', /*Auth*/  getbookingCateringServiceByUserIdbyRestaurant)
bookingRouter.post('/bookOfCateringServicesByRestaurant', /*Auth*/  bookOfCateringServicesByRestaurant)
bookingRouter.put('/upadteCateringServiceOfRestaurant/:id', /*Auth*/  upadteCateringServiceOfRestaurant)
bookingRouter.delete('/deleteCateringervicesByIdRestaurant/:id', /*Auth*/  deleteCateringervicesByIdRestaurant)


module.exports = bookingRouter