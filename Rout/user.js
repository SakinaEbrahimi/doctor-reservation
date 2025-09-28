const express = require('express');
const router = express.Router()
const controller = require('../controller/user')

router.get('/', controller.getHome)
router.get('/doctorDep', controller.getDoctorDep)
router.get('/appointment', controller.getAppointment)
router.post('/contact', controller.postContact)
router.post('/reserve', controller.postReserve)

module.exports = router