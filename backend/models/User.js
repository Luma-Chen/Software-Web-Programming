const normalize = require("normalize-mongoose");
const mongoose = require("mongoose");
const schema = mongoose.Schema;
const passport = require("passport-local-mongoose");

//TODO cadastro do vendendor usando dado do user
//TODO modals de confirmacao 
//TODO nome vendedor/comprador, chat/anuncio
//TODO tirar lista de desejo
//TODO disable dropdown actions 
//TODO tirar notificacao do wiki
//TODO upload
//TODO cadastro do produto em nome de vendedor
//TODO verificar se ja existe um usuario
//TODO Redereciona paara login quando nao estiver authenticado


const UserSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  isSeller: {
    type: Boolean,
    required: true,
  },
});
UserSchema.plugin(passport);
var user = mongoose.model("User", UserSchema);
module.exports = user;
