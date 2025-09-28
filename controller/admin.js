const Admin = require('../models/admin')
const bcrypt = require('bcryptjs')
const Doctor = require('../models/doctors');
const DP = require('../models/dp');
const scheduleTime = require('../models/scheduleTime');
const Comment = require('../models/contact');
const Reserve = require('../models/Reserve');

exports.getLoginAdmin = (req,res)=>{
    res.render('./admin/adminLogin.ejs',{
        path:'/loginAdmin'
    })
}
exports.postLogin = (req, res, next)=>{
    const email = req.body.email;
    const password = req.body.pass;
   

    Admin.findOne({email: email})
    .then((adm)=>{
        if(!adm){
            console.log("Email is Not Found....")
                // req.flash('error', 'Email is Not Found!...')
            return res.redirect('/loginAdmin')
        }
        return bcrypt.compare(password, adm.password)
        .then((match)=>{
            if(match){
                return res.redirect('/doctors')
            }
            return res.redirect('/loginAdmin')
        })
        .catch( err => console.log(err))
    })
    .catch(err => console.log(err))
}

exports.getAddDoctor = (req,res)=>{
    DP.find()
    .then((d)=>{
        res.render('./admin/forms.ejs',{
            dp:d
        })
    })
}
exports.postAddDoctor = (req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const status = req.body.status;
    const lname = req.body.lname;
    const dp = req.body.dp;
    const des = req.body.des;
    const image = req.file.path;


    const doctor = new Doctor({
        name:name,
        lname: lname,
        email:email,
        phone: phone,
        status: status,
        des:des,
        imageUrl:image,
        adminId:  req.admin._id,
        department: dp
    })
    doctor.save()
    .then(()=>{
        res.redirect('/addDoctor')
    })
}
exports.getDoctors = (req,res,next)=>{
    let dp 
     DP.find()
     .then((d)=>{ dp = d})

    Doctor.find()
    .then((doc)=>{
        res.render('./admin/Doctors.ejs',{
            doctor: doc,
            department: dp,
        })
    })
}
exports.postDeleted = (req, res, next)=>{
    const docId = req.body.docId;

    Doctor.findByIdAndRemove(docId)
    .then(()=>{
        res.redirect('/doctors')
    })
    .catch( err => console.log(err))
}
exports.getAddDepartment = (req,res,next)=>{
    res.render('./admin/addDepartment.ejs',{
        path:'/addPart'
    })
}
exports.postAddDepartment = (req,res,next)=>{
    const dp = req.body.dp;

    const Dp = new DP({
        dp: dp,
        adminId: req.admin._id
    })
    Dp.save()
    .then(()=> res.redirect('/addPart'))
    .catch( err => console.log(err))
}
exports.getEdit = (req,res,next)=>{
    const Id = req.params.IdEdit
    let dp
    DP.find()
    .then(d =>{
        dp = d
    })

    return Doctor.findById(Id)
    .then((doc)=>{
        res.render('./admin/edit.ejs',{
            path:'/edit',
            doctor: doc,
            dpart: dp
        })

    })
    .catch( err => console.log(err))
}
exports.postEdit = (req,res,next)=>{
    const name = req.body.name;
    const lname = req.body.lname;
    const email = req.body.email;
    const phone = req.body.phone;
    const status = req.body.status;
    const image = req.file.path;
    const des = req.body.des;
    const ID = req.body.docId;

    Doctor.findById(ID)
    .then((Doc)=>{
        Doc.name = name;
        Doc.lname = lname;
        Doc.email = email;
        Doc.phone = phone;
        Doc.des = des;
        Doc.imageUrl = image;
        Doc.status = status;

       return Doc.save()
    })
    .then(()=> res.redirect('/doctors'))
    .catch( err => console.log(err))
}
exports.logOut = (req,res,next)=>{
    res.clearCookie("token")

    res.redirect('/loginAdmin')
}

exports.getAddTime = (req,res,next)=>{
    const id = req.params.docId
    Doctor.findById(id)
    .then((d)=>{
        res.render('./admin/addScheduleTime.ejs',{
            doc: d
        })

    })
}
exports.postAddTime = (req,res,next)=>{
    const date = req.body.date;
    // const time = req.body.time;
    const Id = req.body.doctorId

    const schedule = new scheduleTime({
        date: date,
        // time: time,
        doctorId: Id,
        isBooked: false
    })
    schedule.save()

    .then(() => res.redirect('/doctors'))
    .catch( err=> console.log(err))
}
exports.getShedculeTime = (req,res,next)=>{
    let doc
    Doctor.find()
    .then((d)=>{ doc = d})
    
    let dp 
    DP.find()
    .then((dep) => {dp = dep})

    scheduleTime.find()
    .then(( s) => {
        res.render('./admin/scheduleTime.ejs',{
            doctor : doc,
            schTime: s,
            department: dp 
        })

    })

}
exports.postDeletedDate = (req, res, next)=>{
    const dateId = req.body.dateId;

    scheduleTime.findByIdAndRemove(dateId)
    .then(()=>{
        res.redirect('/scheduleTime')
    })
    .catch( err => console.log(err))
}
exports.getComment = (req,res,next)=>{
    Comment.find()
    .then((com)=>{
        res.render('./admin/comment.ejs',{
            comment: com
        })
    })
}
exports.postDeleteComment = (req, res, next) =>{
    const comId = req.body.comId
    Comment.findByIdAndRemove(comId)
    .then(()=>{
        res.redirect('/comment')
    })
    .catch(err => console.log(err))
}
exports.getUserReserve = (req, res, next)=>{
    let depId 
    DP.find()
    .then(d => depId= d)
    let docId 
    Doctor.find()
    .then(doc=> docId = doc)
    Reserve.find()
    .then(re =>{
        res.render('./admin/userReserve.ejs',{
            userReserve : re,
            department: depId,
            doctor: docId
        })
    })
}
exports.postDeleteUserReserve =(req,res, next)=>{
    const reserveId = req.body.reserveId;
    Reserve.findByIdAndRemove(reserveId)
    .then( res.redirect('/adminReserve'))
}