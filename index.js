const express = require('express')
const bodyParser = require("body-parser");

const app = express()
const port = 8080
app.listen(port, function(){
console.log(`Your App Listen To ${port} Port`)
})
app.use(express.static(__dirname + '/public'));
const ejs = require('ejs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get('/', async function(req,res){
res.render('index.ejs')

})


app.post('/', async function(req,res){
const {name, email, subject} = req.body
if(!name || !email || !subject) return res.send('You Must Fill All Fields')

const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',//هنا حط الاميل حق الحساب الي هتجيك منه الايميلات
    pass: ''//هنا حط الباس
  }
});

var mailOptions = {
  to: ``,//الاميل الي هتجي عليه الرسائل
  subject: 'New Message',
  html: `<h3>Send By: Name: ${name} <br> Email: ${email} <br>
Subject: ${subject}
<br>

All CopyRight Go To Árab Studio </h3>
`

};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response)
  }
});

res.send('Done')
})
