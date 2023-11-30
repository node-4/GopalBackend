
const express = require('express')
const { } = require('../../middleware/jwt')
const { } = require('../../controller/admin/bookings')
const { bookServiceOfAdmin, getbookingsbyAdmin, getbookingbyidbyAdmin, upadtebookServiceOfAdmin, deleteBookingById } = require('../../controller/admin/bookings')
const { } = require('../../controller/user/booking')
module.exports = (app) => {

        // ADMIN BOOKINGS
        app.post('/api/bookServiceOfAdmin', /*Auth*/ bookServiceOfAdmin);
        app.get('/api/getbookingsbyAdmin', /*Auth*/ getbookingsbyAdmin);
        app.get('/api/getbookingbyidbyAdmin/:id', /*Auth*/ getbookingbyidbyAdmin);
        app.put('/api/upadtebookServiceOfAdmin/:id', /*Auth*/ upadtebookServiceOfAdmin);
        app.delete('/api/deleteBookingById/:id', /*Auth*/ deleteBookingById);

        // Uncomment the following lines if needed
        // ADMIN BOOKINGS (Alternative Routes)
        // app.get('/api/getbook', /*Auth*/ booking.getbookingsbyadmin);
        // app.put('/api/updatebook/:id', /*Auth*/ booking.updatebook);
        // app.get('/api/getbookingbyid/:id', /*Auth*/ booking.getbookingbyid);
        // app.delete('/api/deletebookingbyadmin/:id', /*Auth*/ booking.deletebookingbyadmin);
        // app.put('/api/changeStatusbyIdBooking/:id', /*Auth*/ booking.changeStatusbyIdBooking);
};
