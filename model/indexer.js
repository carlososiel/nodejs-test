'use strict';

const API_PATH = 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs'
    , request = require('request-promise-native')
    ,  _ = require('lodash')
    , app = require('../index');

module.exports.index = () => {
    return request.get(API_PATH).then(async(data) => {
        let db = await app.get('db');
        data = JSON.parse(data);
        _.map(data.hits, (feed) => {
            db.collection('feed').findOne({objectID: feed.objectID}).then(data => {
                if (!data) {
                    db.collection('feed').insertOne(feed);
                }
            });
        });
    });
};