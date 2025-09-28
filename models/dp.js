const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const dpSchema = new Schema({
   dp: {
      type: String,
      require: true,
      unique: true
   },
   adminId: {
    type: Schema.Types.ObjectId,
    ref:'Admin'
   }
})

module.exports = Mongoose.model("DP", dpSchema)