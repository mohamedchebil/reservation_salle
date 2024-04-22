const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required : true
    },
    email: {
        type: String,
        unique: true, 
        required: true
    },
    mdp: { type: String,
         required: true,
          minlength: 6
    },
})

userSchema.pre("save", async function(next){
    const user = this
    if (user.isModified('mdp')){
        user.mdp = await bcrypt.hash(user.mdp,10)
    }
    next()
})

const User = mongoose.model("User",userSchema)
module.exports = User