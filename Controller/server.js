const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const port = 8080;
const users_collection1 = require('../Database/userdata');
require("../Database/mongoose_connection");
const app = express();
const bcrypt = require('bcryptjs')
const console = require('console')


app.use(bodyparser.urlencoded({
    extended:true
}
));

app.use(express.json());

let mainfolder = path.join(__dirname,"../");
app.use(express.static(mainfolder))


app.get("/register",(req,res)=>{
    res.sendFile(mainfolder+"/registrationUI.html")
})

app.get("/login",(req,res)=>{
    res.sendFile(mainfolder+"/loginUI.html")
})

app.post("/register",(req,res)=>{
    //console.log(req.body);
    let req_userdata = new users_collection1(req.body);
    //console.log(req_userdata);
    console.log(req_userdata.password);
    console.log(req_userdata.confirm_password);

    if(req_userdata.password == req_userdata.confirm_password){
        req_userdata.save();
        /*res.send('Registered Successfully')
        /*res.redirect('registerationUI.html');*/
        res.redirect('/loginUI.html')
    }else{
        res.send('Passwords do not match')
    }
})

app.post("/login",async(req,res)=>{
    let usermail = req.body.email;
    let userpassword = req.body.password;

    let req_userdata = await users_collection1.findOne({email:usermail});
    if(req_userdata != null){
        const bcrypt_password_match = await bcrypt.compare(userpassword,req_userdata.password)
        //console.log(bcrypt_password_match)

        if(bcrypt_password_match == true){
            res.redirect('/registrationUI.html')
        }else{
            res.send('Incorrect Password')
        }

    }else{
        res.send('Email does not exists')
    }
    //res.send('logged in')
    res.redirect('/registrationUI.html');
})

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})
