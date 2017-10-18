'use strict';

const express = require('express')
    , app = module.exports = express()
    , path = require('path')
    , mongodb = require('mongodb')
    , schedule = require('node-schedule')
    , router = require('./api/routes')
    , indexer = require('./model/indexer');

/**
 * Some configurations for the express app.
 */
app.use('/static', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');

//setup a database from ENV variable named MONGODB_CONNECTION
if (!process.env.MONGODB_CONNECTION) {
    throw new Error('The database connection environment variable not exist, please add using export MONGODB_CONNECTION')
}
mongodb.connect(process.env.MONGODB_CONNECTION, (err, db) => {
    if(err) {
        throw err;
    }
    app.set('db', db);
});

schedule.scheduleJob('* 0 * * *', indexer.index());

app.use('/', router);

//Run the application in port 3000
//TODO cambiar el puerto al 3000
app.listen(3000, () => console.log('Application is running on http://127.0.0.1:3000'));