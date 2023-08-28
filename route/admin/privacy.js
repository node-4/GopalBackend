const express = require('express');
const router = express.Router();
const  privacy = require('../../controller/admin/privacy');

router.post('/', privacy.create);
router.get('/', privacy.get);
router.get('/:id', privacy.getId)
router.put('/:id',privacy.update );
router.delete('/:id', privacy.delete);




module.exports = router
