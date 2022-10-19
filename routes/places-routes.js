const express = require('express')

const router = express.Router()

const placeController = require('../controllers/places.controller')



router.get('/user/:userid', placeController.getPlacesByUid)


router.post('/',placeController.createPlace);

router.patch('/update/:pid',placeController.updatePlace)

router.delete('/delete/:pid',placeController.deletePlace)
router.get('/:pid',placeController.getPlaceById)

module.exports = router