const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const fs = require('fs');
const bodyParser = require('body-parser')

const mongoose = require("mongoose");
const myBudgetModel = require("./models/myBudget_schema");

let url = 'mongodb://localhost:27017/mybudgetdata';

app.use('/', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*
'#ffcd56',
'#ff6384',
'#36a2eb',
'#fd6b19',
'#a05d56',
'#d0743c',
'#ff8c00'*/

app.get('/budget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
            .then(() => {
                //console.log("Connected to the database")
                myBudgetModel.find({})
                            .then((data) => {
                                res.send(data)
                                mongoose.connection.close()
                            })
                            .catch((connectionError) => {
                                console.log(connectionError)
                            })
            })  
            .catch((connectionError) => {
                console.log(connectionError)
            });
});

app.post('/mybudget', (req, res) => {
    let newData = {
        "title": req.body.title,
        "budget": req.body.budget,
        "color": req.body.color
    };

    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
            .then(() => {
                console.log("Connected to the database")
                myBudgetModel.insertMany(newData)
                            .then((data) => {
                                res.send(data)
                                mongoose.connection.close()
                            })
                            .catch((connectionError) => {
                                console.log(connectionError)
                            })
            })  
            .catch((connectionError) => {
                console.log(connectionError)
            });
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});