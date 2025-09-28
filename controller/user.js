const Doctor = require('../models/doctors')
const DP = require('../models/dp')
const scheduleTime = require('../models/scheduleTime')
const Contact = require('../models/contact')
const Reserve = require('../models/Reserve')

exports.getHome = async (req,res, next)=>{
    let Dp 
    DP.find()
    .then(d=> Dp=d)
    let schedules = await  scheduleTime.find().populate('doctorId')
    const group = []
    for( s of schedules){
        const id = s.doctorId._id
        if(!group[id]){
            group[id] = {doctorId:s.doctorId, schedules:[]}
        }
        group[id].schedules.push({
            date: s.date,
            time:s.time,
            id:s._id
        })
    }
    res.render('./user/index.ejs',{
        doctorList: Object.values(group),
        dp: Dp,
        
    })
}
exports.getDoctorDep = (req, res,next)=>{
   
    const departmens =  DP.find()
    const selecdp = req.query.dp

    if (selecdp) {
        Doctor.find({department: selecdp}).populate('department')
        .then((doc)=>{
            res.render('./user/doctorFilter.ejs',{
               doctor: doc,
                departmens,
                selecdp,
    
            })
        })
    }else{
        Doctor.find().populate('department')
        .then((doc)=>{
            res.render('./user/doctorFilter.ejs',{
               doctor: doc,
                departmens,
                selecdp,
    
            })
        })
    }  
}
exports.getAppointment = async (req,res,next)=>{
    try {
        const departmens = await DP.find();
        const selectDpt = req.query.department || null;
        const selectDoctor = req.query.doctor || null;
        let doctor = []
        let dates = []        
        if(selectDpt){
            doctor = await Doctor.find({department: selectDpt})
            // console.log(req.body.department)
        }
        
        if(selectDoctor){
            const doc = await Doctor.findById(selectDoctor)            
            dates = await scheduleTime.find({doctorId: selectDoctor})
        }       
        res.render('./user/appointment.ejs',{
        departmens,
        selectDpt,
        doctor,
        selectDoctor,
        dates
    })
    }
    catch(err){
        console.log("......................................................",err)
    }
}
exports.postContact = (req, res, next)=>{
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;

    const contact = new Contact({
        name: name,
        email: email,
        subject: subject,
        message: message
    })
    contact.save()
    .then(()=>{ res.redirect('/')})
}
exports.postReserve = (req, res, next)=>{
    const patientName = req.body.patientName;
    const patientEmail = req.body.patientEmail;
    const patientPhone = req.body.patientPhone;
    const patientMessage = req.body.patientMessage;
    const departmentId = req.body.departmentId;
    const doctorId = req.body.doctorId;
    const date = req.body.date;
    
    const reserve = new Reserve({
        patientName : patientName,
        patientEmail : patientEmail,
        patientPhone: patientPhone,
        patientMessage: patientMessage,
        date: date,
        doctorId: doctorId,
        departmentId: departmentId
    })
    reserve.save()
    .then(()=>{ res.redirect('/')})
    .catch( err => console.log(err))

}