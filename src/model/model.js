const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://authenticatingmongodbatlas:authenticatingmongodbatlas@myappclustera.e2ppr.mongodb.net/celeb?retryWrites=true&w=majority');

const schema = mongoose.Schema;
const modelcele = new schema({
    name: String,
    frndname: String,
    email: String,
   
});


var diwalidata = mongoose.model('celeeba', modelcele);
module.exports = diwalidata;