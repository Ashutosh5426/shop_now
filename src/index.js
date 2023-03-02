const express = require('express')
const route = require('./routes/route.js')
const mongoose = require('mongoose');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const mongoUrl = 'mongodb+srv://AshutoshGupta:ashutosh54264850@cluster0.ukus0.mongodb.net/group68Database'

mongoose.connect( mongoUrl, {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err));
    

app.use('/', route)

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port: ' + (process.env.PORT || 3000))
})