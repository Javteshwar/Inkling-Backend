const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRoute = require('./routes/authRoute');
const userDocumentRoute = require('./routes/userDocumentRoute');
const storeDocumentRoute = require('./routes/storeDocumentRoute');

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
        app.listen(process.env.PORT||3333);
        console.log('Listening at Some Port');
    }).catch(e => {
        console.log('Error Occured', e);
    });
app.get("/", function(req, res) {
  //when we get an http get request to the root/homepage
  res.send("Hello World");
});
app.use(authRoute);
app.use(userDocumentRoute);
app.use(storeDocumentRoute);
