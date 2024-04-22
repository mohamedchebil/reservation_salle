const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.signup = async (req, res) => {
  const { nom, prenom, email, mdp} = req.body;

  try {
    const UserExist = await User.findOne({ email });
    if (UserExist) {
      res.status(302).UserExist
    }
    const user = await User.create({
      nom,
      prenom,
      email,
      mdp,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
};

module.exports.login = async (req, res) => {
  const { email, mdp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User non trouvé." });
    }
    const isMdpValid = await bcrypt.compare(mdp, user.mdp);
    if (!isMdpValid) {
      return res.status(400).json({ message: "Mdp incorrect" });
    }
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
    res.status(200).json({ message: "connexion réussie.",token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error" });
  }
};
