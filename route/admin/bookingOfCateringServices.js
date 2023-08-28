
const express = require('express')
const { } = require('../../middleware/jwt')
const {} = require('../../controller/admin/bookings')
const { } = require('../../controller/restaurant/bookings')
const {getbookingCateringServicebyAdmin,getbookingCateringServiceByUserIdbyAdmin,getbookingCateringServicebyRestaurantIdbyAdmin , bookOfCateringServicesByAdmin ,upadteCateringServiceOfAdmin , deleteCateringervicesById} = require('../../controller/admin/bookingOfCateringServices')
const bookingRouter = express.Router()

//ADMIN

bookingRouter.get('/getbookingCateringServicebyAdmin', /*Auth*/  getbookingCateringServicebyAdmin)
bookingRouter.get('/getbookingCateringServiceByUserIdbyAdmin/:userId', /*Auth*/  getbookingCateringServiceByUserIdbyAdmin)
bookingRouter.get('/getbookingCateringServicebyRestaurantIdbyAdmin/:restaurantId', /*Auth*/  getbookingCateringServicebyRestaurantIdbyAdmin)
bookingRouter.post('/bookOfCateringServicesByAdmin', /*Auth*/  bookOfCateringServicesByAdmin)
bookingRouter.put('/upadteCateringServiceOfAdmin/:id', /*Auth*/  upadteCateringServiceOfAdmin)
bookingRouter.delete('/deleteCateringervicesById/:id', /*Auth*/  deleteCateringervicesById)


module.exports = bookingRouter