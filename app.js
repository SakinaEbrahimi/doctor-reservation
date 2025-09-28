const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const Mongoose = require('mongoose');
const router = require('./Rout/admin');
const admin = require('./models/admin')
const app = express();
const bcrypt = require('bcryptjs')
const DP = require('./models/dp')
const doctor = require('./models/doctors');
const multer = require('multer');
const userRout = require('./Rout/user');
const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require('constants');

app.use(bodyParser.urlencoded({extended: false}));

const fileStorage = multer.diskStorage({
    destination: (req, file, cb )=>{
        cb(null, 'images/')
    },
    filename:(req, file, cb) =>{
        cb(null, new Date().toISOString().replace(/:/g, '-')+file.originalname)
    }
})

app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({ storage: fileStorage}).single('image'))

app.use( '/images',express.static(path.join(__dirname, 'images')));
app.set('view engin', 'ejs')

app.use( (req, res,next) =>{
    admin.findById('687c6ce2f782d406407ad395')
    .then(adim =>{
        req.admin = adim;
        next()
    })
    .catch(err =>  console.log(err))
})
app.use((req, res, next)=>{
    DP.find()
    .then((department)=>{
        departments = department
        next()
    })
    .catch(err => console.log(err))
})
app.use(router)
app.use(userRout)
Mongoose.connect('mongodb://localhost:27017/doctorsReservation')
.then(()=>{    
    admin.findOne()
    .then((adm)=>{
        if(!adm){
            return hashPass = bcrypt.hash('1234',12)
            .then((hashpass)=>{
                const Admin = new admin({
                    name:"Admin",
                    email: "admin@gmail.com",
                    password: hashpass
                })
                Admin.save()

            })            
        }
    })
    
    app.listen(3000)
    console.log('Connected to Database')
})
.catch((err)=>{
    console.log(err)
})