const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    reservedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    code : String,
    startTime: Date,
    endTime: Date,
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;