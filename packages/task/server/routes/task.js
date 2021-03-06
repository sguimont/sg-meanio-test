'use strict';

// The Package is past automatically as first parameter
module.exports = function(Task, app, auth, database) {

    app.get('/task/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/task/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/task/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/task/example/render', function(req, res, next) {
        Task.render('index', {
            package: 'task'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
};
