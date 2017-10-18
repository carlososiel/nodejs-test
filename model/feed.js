'use strict';
const Rx = require('rxjs')
    , app = require('../index');

module.exports.list = () => {
    return Rx.Observable.fromPromise(app.get('db').collection('feed').find({}).toArray());
};

module.exports.findOne = (id) => {
    return Rx.Observable.fromPromise(app.get('db').collection('feed').findOne({objectID: id}));
};

module.exports.remove = (id) => {
    return Rx.Observable.fromPromise(app.get('db').collection('feed').removeOne({objectID: id}));
};