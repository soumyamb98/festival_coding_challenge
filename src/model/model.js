const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://authenticat:authenticat@diwali.4hpjv.mongodb.net/test');

const schema = mongoose.Schema;
const modelcele = new schema({
    name: String,
    frndname: String,
    email: String,
   
});


var diwalidata = mongoose.model('celeeba', modelcele);
module.exports = diwalidata;