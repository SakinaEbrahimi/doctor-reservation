const express = require('express');
const router = express.Router()
const controller = require('../controller/admin')

router.get('/loginAdmin', controller.getLoginAdmin)
router.post('/loginAdmin', controller.postLogin)
router.get('/addDoctor', controller.getAddDoctor)
router.post('/addDoctor', controller.postAddDoctor)
router.get('/doctors', controller.getDoctors)
router.post('/delet', controller.postDeleted)
router.post('/deletDate', controller.postDeletedDate)
router.get('/addPart', controller.getAddDepartment)
router.post('/addPart', controller.postAddDepartment)
router.get('/edit/:IdEdit', controller.getEdit)
router.post('/edit', controller.postEdit)
router.post('/logOut', controller.logOut)
router.get('/addTime/:docId', controller.getAddTime)
router.post('/addTime', controller.postAddTime)
router.get('/scheduleTime', controller.getShedculeTime)
router.get('/comment', controller.getComment)
router.post('/deleteComment', controller.postDeleteComment)
router.get('/adminReserve', controller.getUserReserve)
router.post('/deleteUserReserve', controller.postDeleteUserReserve)


module.exports = router