const mongoose = require("mongoose");

const mailerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:false
    },
    password:{
        type:String,
        required:true
    }
})

    //create collection
const Regmail = new mongoose.model("Regmail",mailerSchema);


//Creating doc.

// const firstDoc = new Regmail({
//     name:"Kunal",
//     email:"kunal170@gmail.com"
// })

// firstDoc.save();
module.exports = Regmail;