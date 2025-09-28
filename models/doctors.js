const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const doctorSchema = new Schema({
   name: String,
   lname: String,
   email: String,
   phone: String,
   description: String,
   imageUrl: String,
   status:{
       type: String,
       default: 'pending'
   },
   adminId: {
    type: Schema.Types.ObjectId,
    ref:'Admin'
   },
   department: {
    type: Schema.Types.ObjectId,    
    ref:'DP',
   },
   schedules:{
    type: Schema.Types.ObjectId,    
    ref:'ScheduleTime',
   }
})
module.exports = Mongoose.model("Doctors", doctorSchema)