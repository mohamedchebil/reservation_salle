const Room = require('../models/room');
const Reservation = require('../models/reservation');

exports.createReservation = async (req, res) => {
    const { num, code, startTime, endTime } = req.body;

    try {
        const room = await Room.findOne({ num });
        if (!room) {
            return res.status(404).json({ message: "La salle n'existe pas" });
        }
        const isRoomAvailable = await isRoomFree(room.id, startTime, endTime);
        if (!isRoomAvailable) {
            return res.status(409).json({ message: "La salle est déjà réservée pour cette période" });
        }
        const reservation = await Reservation.create({
            room: room.id,
            reservedby: req.userId,
            code,
            startTime,
            endTime,
        });
        res.status(201).json(reservation);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "error" });
    }
};

async function isRoomFree(roomId, startTime, endTime) {
    try {
        // Recherche de réservations existantes qui chevauchent la période spécifiée
        const conflictingReservation = await Reservation.findOne({
            room: roomId,
            $or: [
                { startTime: { $lt: endTime }, endTime: { $gt: startTime } }, // Période chevauchante
                { startTime: { $gte: startTime, $lt: endTime } }, // Début de période inclus
                { endTime: { $gt: startTime, $lte: endTime } } // Fin de période inclus
            ]
        });

        // Si une réservation chevauche la période spécifiée, la salle n'est pas disponible
        return !conflictingReservation;
    } catch (error) {
        console.error("Erreur lors de la vérification de la disponibilité de la salle :", error);
        return false;
    }
}

module.exports.listReserve = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: "Erreur" });
    }
};

exports.modifyReservation = async (req, res) => {
    const { startTime, endTime } = req.body;
    const { code } = req.params

    try {
        const reservation = await Reservation.findOne({ code });
        if (!reservation) {
            return res.status(404).json({ message: "La réservation n'existe pas" });
        }
        reservation.startTime = startTime;
        reservation.endTime = endTime;

        const updatedReservation = await reservation.save();
        res.status(200).json(updatedReservation);
    } catch (error) {
        res.status(500).json({ message: "Erreur " });
    }
};

module.exports.deleteReservation = async (req, res) => {
    const { code } = req.params; 
    try {
        const reservation = await Reservation.findOne({ code});
        if (!reservation) {
            return res.status(404).json({ message: "La réservation n'existe pas" });
        }
        await reservation.deleteOne();
        res.status(204).json({ message: "Réservation supprimée avec succès" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erreur" });
    }
};


module.exports.getCalendar = async (req, res) => {
    try {
        const rooms = await Room.find();

        const calendar = [];
        for (const room of rooms) {
            const reservations = await Reservation.find({ room: room._id }).select('startTime endTime');
            calendar.push({ room, reservations });
        }

        res.status(200).json(calendar);
    } catch (error) {
        console.error("Erreur lors de la récupération du calendrier des réservations :", error);
        res.status(500).json({ message: "Erreur" });
    }
};
