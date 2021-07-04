const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRoute = require('./routes/authRoute');
const userDocumentRoute = require('./routes/userDocumentRoute');
const storeDocumentRoute = require('./routes/storeDocumentRoute');
const dotenv = require('dotenv');

dotenv.config();
app.use(express.json());
//Connect Database
const dbUri = process.env.DATABASE_URI;
mongoose.connect(
    dbUri,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }).then(() => {
        app.listen(process.env.PORT || 3333);
        console.log(`Listening at ${process.env.PORT}`);
    }).catch(e => {
        console.log('Error Occured', e);
    });
app.get("/", function (req, res) {
    res.send("WORKING");
});
app.use(authRoute);
app.use(userDocumentRoute);
app.use(storeDocumentRoute);
