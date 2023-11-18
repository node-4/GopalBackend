
const express = require('express')
const { } = require('../../middleware/jwt')
const { } = require('../../controller/admin/bookings')
const { } = require('../../controller/restaurant/bookings')
const { bookOfCateringServices, getbookingCateringServicebycustomer, getbookingCateringServicebyidbycustomer } = require('../../controller/user/bookingOfCateringServices')
const bookingRouter = express.Router()
module.exports = (app) => {
        app.post('/api/bookOfCateringServices', /*Auth*/ bookOfCateringServices);
        app.get('/api/getbookingCateringServicebycustomer', getbookingCateringServicebycustomer);
        app.get('/api/getbookingCateringServicebyidbycustomer/:id', getbookingCateringServicebyidbycustomer);
}