const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const reserveSchema = new Schema({
   patientName: {
      type: String,
   },
   doctorId: {
    type: Schema.Types.ObjectId,
    ref:'Doctors'
   },
   departmentId: {
    type: Schema.Types.ObjectId,
    ref:'DP'
   },
   patientEmail: {
    type: String,
    },
    patientPhone: {
        type: String,
    },
    patientMessage: {
        type: String,
    },
    date: {
        type: String
    }
})

module.exports = Mongoose.model("Reserve", reserveSchema)