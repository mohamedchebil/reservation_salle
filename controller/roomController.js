const Room = require('../models/room');

module.exports.addRoom = async (req,res) => {
    const { num, nom, capacite } = req.body

    try{
        const roomExist = await Room.findOne({ num })
        if(roomExist){
            res.status(302).roomExist
        }
        const room = await Room.create({
            num,
            nom,
            capacite,
          });
          res.status(201).json(room);
    }
    catch (error) {
    res.status(500).json({ message: "error" });
  }
}

module.exports.listRoom = async(req,res) => {
  try{
    const rooms = await Room.find()
    res.status(200).json(rooms)
  }
  catch{
    res.status(500).json({ message: "Erreur" });
  }
}