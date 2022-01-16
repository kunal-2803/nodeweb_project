const express =require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
// const mongoose = require("mongoose");
var nodemailer = require("nodemailer");
// const Regmail = require("./models/regmail");

require("./db/conn");
const Regmail = require("./models/regmail");
// const firstDoc = Regmail.firstDoc.email;

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname,"./public");
const template_path = path.join(__dirname,"./templates/views");
const partials_path = path.join(__dirname,"./templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine" , "hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);








app.get("/register",(req,res)=>{
    res.render("register");
});

app.get("/",(req,res)=>{
    res.render("index");
});
///////////register////////
app.post("/register",async(req,res)=>{
    try{
        
            const user = new Regmail({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            })
            const regdata = await user.save();
            res.status(201).render("index");

            var transporter = nodemailer.createTransport({
                service : 'gmail',
                auth:{
                    user:'psd009902@gmail.com',
                    pass:'Kunal@123'
                }
            });
            
            var mailOptions ={
                from:'psd009902@gmail.com',
                to:user.email,
                subject:'Demo email',
                text:'Hi this is Kunal Thank you for Logging in !!'
            };
            
            transporter.sendMail(mailOptions,function(error,info){
                if(error){
                    console.log(error);
                }else{
                    console.log('Email sent:'+info.response);
                }
            });
        
    }catch(error){
        res.status(400).send(error);
    }
});

app.post("/",async(req,res)=>{
    try{
            const email= req.body.email;
            const password = req.body.password;
            const nameu = req.body.name;
            // console.log(email);
                // console.log(usermail.email);
            const usermail = await Regmail.findOne({email:email});
            if(usermail.password === password){                
            res.status(201).render("home");
        }else{
            res.send("invalid login");
        }
    }catch(error){
        res.status(400).send("invalid login");
    }
});

app.get("/home",(req,res)=>{
    res.render("home",{
        name: req.body.name,
    });
});

app.listen(port,()=>{
    console.log('Listening to port on http://localhost:3000');
})