'use strict';

const router = module.exports = require('express').Router()
    , _ = require('lodash')
    , moment = require('moment')
    , indexer = require('../model/indexer')
    , feed = require('../model/feed');

router.get('/', (req, res) => {
    feed.list().subscribe(data => {
            _.map(data, (feed) => {
                let newDate = moment(feed.created_at);
                let now = moment();
                let diff = now.diff(newDate, 'days');
                //TODO cambiar por las fechas correctas
                if (diff < 1 && newDate.date() === now.date()) {
                    feed.created_at = newDate.format('hh:mm A');
                }
                else if(diff < 2 && now.date() - newDate.date() === 1) {
                    feed.created_at = 'Yesterday';
                }
                else {
                    feed.created_at = newDate.format('MMM DD');
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