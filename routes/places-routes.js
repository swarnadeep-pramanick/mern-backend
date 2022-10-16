const express = require('express')

const router = express.Router()

const placeController = require('../controllers/places.controller')

router.get('/:pid',placeController.getPlaceById)

router.get('/user/:userid', placeController.getPlacesByUid)


router.post('/',placeController.createPlace);

router.patch('/update/:pid',placeController.updatePlace)

router.delete('/delete/:pid',placeController.deletePlace)

module.exports = router