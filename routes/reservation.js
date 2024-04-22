const { Router } = require('express')
const reservationController = require('../controller/reservationController')
const auth = require('../middleware/auth')

const router = Router()
router.post("/reserve", auth, reservationController.createReservation)
router.get("/listReserve", auth, reservationController.listReserve)
router.put("/reserve/:code", auth, reservationController.modifyReservation)
router.delete("/deleteReserve/:code", auth, reservationController.deleteReservation)
router.get("/calendar", auth, reservationController.getCalendar)

module.exports = router