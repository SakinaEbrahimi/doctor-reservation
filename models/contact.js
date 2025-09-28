const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const contactSchema = new Schema({
   name: String,
   subject: String,
   email: String,
   message: String,
  
})

module.exports = Mongoose.model("Contact", contactSchema)