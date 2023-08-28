const express = require('express');
const router = express.Router();

const {registerAdmin,adminLogin} = require('../../controller/admin/adminCreate');

router.route('/admin/register').post(registerAdmin);
router.route('/admin/login').post(adminLogin);

module.exports = router;
