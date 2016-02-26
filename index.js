var express = require('express');
var router = express.Router();

/* GET Questions page. */
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('data');
    var main_count = '';
    
    //Count collection
    collection.count({}, function( err, count){
        main_count = count;
    });
    
    collection.find({},{limit:10},function(e,docs){
        res.render('index', {
            'questions' : docs,
            'paged' : main_count/10,
            'main_count' : main_count,
            'current' : 1,
            'next': 2,
            'prev': ''
        });
    });
});

/* GET Questions page (paged). */
router.get('/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('data');
    var main_count = '';
    
     //Count collection
    collection.count({}, function( err, count){
        main_count = count;
    });
    
    page = req.params.id*10;
    collection.find({},{skip:page,limit:10},function(e,docs){
        res.render('index', {
            'questions' : docs,
            'paged' : main_count/10,
            'main_count' : main_count,
            'current' : req.params.id,
            'next': parseInt(req.params.id)+1,
            'prev': parseInt(req.params.id)-1
        });
    });
});

module.exports = router;
