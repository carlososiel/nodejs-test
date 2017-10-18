'use strict';

const router = module.exports = require('express').Router()
    , _ = require('lodash')
    , indexer = require('../model/indexer')
    , feed = require('../model/feed');

router.get('/', (req, res) => {
    feed.list().subscribe(data => {
            _.map(data, (feed) => {
                let newDate = new Date(feed.created_at);
                let now = new Date();
                let diff = (now - newDate)/1000/60/24;
                if (diff < 24) {
                    feed.created_at = newDate.toLocaleString({hour: '2-digits', minute: '2-digits', hour12: true});
                }
                else if(diff < 48) {
                    feed.created_at = 'Yesterday';
                }
                else {
                    feed.created_at = newDate.toLocaleString({day: 'numeric', month: 'short'});
                }
            });
            res.render('list.pug', {title: 'List of feeds', feeds: data});
        }
    );
});

router.get('/feed/delete/:id', (req, res) => {
    feed.findOne(req.params.id).subscribe(data => {
        if(data) {
            feed.remove(req.params.id).subscribe(data => res.redirect('/'));
        }
        else {
            res.redirect('/');
        }
    });
});

router.get('/index', (req, res) => {
    indexer.index();
    res.render('index.pug', {title: 'Update index', message: 'Index updated'});
});