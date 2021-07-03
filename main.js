const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRoute = require('./routes/authRoute');
const userDocumentRoute = require('./routes/userDocumentRoute');
const storeDocumentRoute = require('./routes/storeDocumentRoute');

app.use(express.json());
//Connect Database
const dbUri = 'mongodb+srv://javteshwar:pass123@testcluster.1ap0s.mongodb.net/inkling-personal'
mongoose.connect(
    dbUri,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }).then(() => {
        app.listen(3333);
        console.log('Listening at Port 3333');
    }).catch(e => {
        console.log('Error Occured', e);
    });

app.use(authRoute);
app.use(userDocumentRoute);
app.use(storeDocumentRoute);