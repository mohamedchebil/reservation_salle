const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    num : {
        type : String, 
        unique : true
    },
    nom : String,
    capacite : String,
})

const Room = mongoose.model("Room",roomSchema)
module.exports = Room