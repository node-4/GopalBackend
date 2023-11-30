const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const serverless = require("serverless-http");
const dotenv = require('dotenv');
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 4000;
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Db connect successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Working App" });
});
////////////////////////////////////////////////////////////////////////////// new Routes///////////////////////////////////////////////////////////////////////////////////////////
// admin routes use
require('./route/admin/adminCreate')(app);
require('./route/admin/restaurantCreate')(app);
require('./route/admin/cancellationPolicy')(app);
require('./route/admin/privacy')(app);
require('./route/admin/aboutus')(app);
require('./route/admin/dishes')(app);


// restaurant routes use
require('./route/restaurant/cancellationPolicy')(app);
require('./route/restaurant/cateringSection')(app);
require('./route/restaurant/dishes')(app);
require('./route/restaurant/Kitchen')(app);
require('./route/restaurant/restaurantCreate')(app);
// restaurant routes use
require('./route/user/user.create')(app);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = {
  handler: serverless(app),
};


// const app = require('./app');

