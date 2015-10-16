var express     = require('express'),
    router      = express.Router(),
    Team        = require('../models/team');

router.get('/', function(req, res) {
    var page = (req.params.page > 0 ? req.params.page : 1) - 1;
    var perPage = 30;
    var options = {
        perPage: perPage,
        page: page
    };

    Team.list(options, function (err, teams) {
        if (err) return res.render('500');

        Team.count().exec(function (err, count) {
            res.render('admin/teams/list', {
                teams: teams,
                page: page + 1,
                pages: Math.ceil(count / perPage)
            });
        });
    });
});

router.get('/new', function(req, res) {
    console.log(res.locals);
    res.render('admin/teams/new');
});

router.post('/new', function(req, res) {
    req.flash('success', 'New Team Created!')
    res.redirect('/admin/teams');
});

module.exports = router;