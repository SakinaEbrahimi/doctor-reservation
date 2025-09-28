const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const adminSchema = new Schema({
    name:{
        type: String
    },
   email:{
       type: String,
       require:true
   },
   password:{
       type: String,
       require:true
   }
})

module.exports = Mongoose.model("Admin", adminSchema)