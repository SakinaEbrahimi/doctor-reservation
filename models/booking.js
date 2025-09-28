const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const bookSchema = new Schema({
    date: {
        type: Date,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    patientName: {
        type: String,
        require: true
    },
    patientPhone: {
        type: String,
        require: true
    },
    doctorId: {
        type: Schema.Types.ObjectId,    
        ref:'Doctors',
    }
})

module.exports = Mongoose.model("Booking", bookSchema)