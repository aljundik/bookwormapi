const express = require('express');
const path = require('path');
const mongoose =require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Promise = require('bluebird');

dotenv.config();

const auth =require ('./routes/auth');
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL);
// sudo service mongod start


const app = express();
app.use(bodyParser.json());



app.use('/api/auth',auth);

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,"index.html"));

});

app.listen(8080,()=> {console.log('running on 8080')});
