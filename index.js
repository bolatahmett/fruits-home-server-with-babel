// import express from 'express';
// import bodyParser from 'body-parser';

// const app = express();

// app.use(bodyParser.json());

// app.get('/', (req, res) => {
//     res.send("Hello Babel")
// })

// app.listen(4000, () => {
//     console.log(`app is listening to port 4000`);
// })



import express from "express";
import { urlencoded, json } from 'body-parser';
import cors from 'cors';
import { MongoClient } from 'mongodb';
var app = express();
app.use(cors());
const dbUrl = 'mongodb+srv://fruitshomeonur:080905Ap@fruitshome-7laqp.gcp.mongodb.net/test?authSource=admin&replicaSet=FruitsHome-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true';
const dbName = "FruitsHome";
const collection = "Products";
// create application/x-www-form-urlencoded parser
var urlencodedParser = urlencoded({ extended: false });
// create application/json parser
var jsonParser = json();
// POST /login gets urlencoded bodies
app.post('/api/addItem', jsonParser, function (req, res) {
    MongoClient.connect(dbUrl, (err, client) => {
        if (err)
            throw err;
        const db = client.db(dbName);
        db.collection(collection).insertOne(req.body, (err, result) => {
            if (err)
                throw err;
            client.close();
            res.send('success');
        });
    });
});
// POST /api/users gets JSON bodies
app.post('/api/getItem', jsonParser, function (req, res) {
    let result = {};
    MongoClient.connect(dbUrl, (err, client) => {
        if (err)
            throw err;
        const db = client.db(dbName);
        db.collection(collection).findOne(req, (err, result) => {
            if (err)
                throw err;
            res.send(result);
            client.close();
        });
    });
});
// POST /api/users gets JSON bodies
app.post('/api/removeItem', jsonParser, function (req, res) {
    MongoClient.connect(dbUrl, (err, client) => {
        if (err)
            throw err;
        const db = client.db(dbName);
        db.collection(collection).deleteOne(req.body, (err, result) => {
            if (err)
                throw err;
            client.close();
            res.send('success');
        });
    });
});
app.post('/api/getAll', jsonParser, function (req, res) {
    MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, client) => {
        if (err)
            throw err;
        const db = client.db(dbName);
        db.collection(collection).find().toArray()
            .then((docs) => res.send(docs));
    });
});
app.listen(5000);
