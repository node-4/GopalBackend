
const express = require('express')
const { } = require('../../middleware/jwt')
const {} = require('../../controller/admin/bookings')
const { bookServiceOfAdmin ,getbookingsbyAdmin ,getbookingbyidbyAdmin , upadtebookServiceOfAdmin ,deleteBookingById} = require('../../controller/admin/bookings')
const {  } = require('../../controller/user/booking')
const bookingRouter = express.Router()

//ADMIN
bookingRouter.post('/bookServiceOfAdmin', /*Auth*/  bookServiceOfAdmin)
bookingRouter.get('/getbookingsbyAdmin', /*Auth*/  getbookingsbyAdmin)
bookingRouter.get('/getbookingbyidbyAdmin/:id', /*Auth*/  getbookingbyidbyAdmin)
bookingRouter.put('/upadtebookServiceOfAdmin/:id', /*Auth*/  upadtebookServiceOfAdmin)
bookingRouter.delete('/deleteBookingById/:id', /*Auth*/  deleteBookingById)


//ADMIN
// bookingRouter.get('/getbook', /*Auth*/  getbookingsbyadmin)
// bookingRouter.put('/updatebook/:id', /*Auth*/  updatebook)
// bookingRouter.get('/getbookingbyid/:id', /*Auth*/  getbookingbyid)
// bookingRouter.delete('/deletebookingbyadmin/:id', /*Auth*/  deletebookingbyadmin)
// bookingRouter.put('/changeStatusbyIdBooking/:id', /*Auth*/  changeStatusbyIdBooking)
//changeStatusbyIdBooking

module.exports = bookingRouter
