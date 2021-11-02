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

        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'creationzv@gmail.com',
                pass: 'Vishnu@123'
            }
        })
    
        console.log("started mail");
        
    
        let mailDetails = {
            from: 'creationzv@gmail.com',
            to: response.email,
            subject: 'Diwali Wishes from ' + response.name,
            text: 'deepavali greetings https://afestivalcodings.herokuapp.com/'+response._id
        };
        console.log(mailDetails);
        mailTransporter.sendMail(mailDetails, function (err, data) {
    
            if (err) {
                console.log(err);
                res.json({ success: false });
                console.log('Error Occurs! Bad Request');
            } else {
                res.json({ success: true, name: response.frndname });
    
                console.log('Email sent successfully');
            }
        });
    }) // saving to database

  
});
































app.listen(port, () => console.log('server ready at ' + port));