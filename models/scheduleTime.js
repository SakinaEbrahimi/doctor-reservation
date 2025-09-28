const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const scheduleSchema = new Schema({
    date: {
        type: Date,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    isBooked:{
        type: Boolean,
        default: false
    },
    doctorId: {
        type: Schema.Types.ObjectId,    
        ref:'Doctors',
    }
})

module.exports = Mongoose.model("ScheduleTime", scheduleSchema)