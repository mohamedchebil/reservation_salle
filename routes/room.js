const { Router } = require('express')
const roomController = require('../controller/roomController')
const auth = require('../middleware/auth')

const router= Router()
router.post("/addRoom", auth, roomController.addRoom)
router.get("/listRoom", auth, roomController.listRoom)

module.exports = router