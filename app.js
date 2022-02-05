const express = require('express');
const app = new express();
const port = process.env.PORT || 5000;
const nodemailer = require('nodemailer');
const diwaliData = require("./src/model/model");

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views'); 
app.get('/', (req, res) => {
    res.render('index');
    // res.send('coding challenge');
})

app.get('/diwali', function (req, res) {
    let name = req.query.name;
    res.render('diwali', {
        name: name
    })
});


app.post('/sendmail', function (req, res) {
    console.log(req.body);
    var item = {
        name: req.body.name,
        frndname: req.body.frndname,
        email: req.body.email
    }
    var diwali = diwaliData(item);
    diwali.save().then((response) => {
        console.log(response);

        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            // user: 'msmiam918@gmail.com',
            // pass: 'myfestivalapppassword989'
            user: 'appnodemailermail@gmail.com',
            pass: '12345670898@AA'
        }
        });

        var mailOptions = {
        from: 'appnodemailermail@gmail.com',
        to: response.email,
        subject: 'Diwali Wishes from ' + response.name,
        text: 'deepavali greetings from soumyamb https://afestivalcodings.herokuapp.com/'+response._id
        };
        
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            res.json({ success: true, name: response.frndname });
            console.log('Email sent: ' + info.response);
        }
        });
        
        
    
        
        console.log(mailDetails);
        
    }) // saving to database

  
});
































app.listen(port, () => console.log('server ready at ' + port));