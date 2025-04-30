const { ObjectId } = require('mongodb'); //importing objectId so documents can be searched by id
module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        db.collection('messages').find().toArray((err, result) => {
          if (err) return console.log(err)
          console.log(result);
          res.render('profile.ejs', {
            user : req.user,
            movieList: result
          })
        })
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout(() => {
          console.log('User has logged out!')
        });
        res.redirect('/');
    });

// message board routes ===============================================================

    app.post('/messages', (req, res) => {
      db.collection('messages').insertOne({userNameDB: req.body.userNameFromForm, movieNameDB: req.body.movieNameFromForm, movieDirectorDB: req.body.movieDirectorFromForm, yearCreatedDB: req.body.yearCreatedFromForm, movieLengthDB: req.body.movieLengthFromForm, watchedMovieDB: req.body.watchedMovieFromForm, movieReviewDB: req.body.movieReviewFromForm, thumbUpDB: 0}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile')
      })
    })

    app.put('/upVote', (req, res) => {
      const movieId = req.body._id; //receives id from request body
      db.collection('messages')
      .findOneAndUpdate({ _id: ObjectId(movieId) }, {
        $inc: {
          thumbUpDB: 1
        }
      }, {
        sort: {_id: -1},
        upsert: false
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    app.put('/downVote', (req, res) => {
      const movieId = req.body._id; //receives id from request body
      db.collection('messages')
      .findOneAndUpdate({ _id: ObjectId(movieId) }, {
        $inc: {
          thumbUpDB: -1
        }
      }, {
        sort: {_id: -1},
        upsert: false
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    app.put('/watchStatus', (req, res) => {
      const movieId = req.body._id; //receives id from request body
      // let newWatchStatus;
      // if(req.body.newWatchStatus){
      //   newWatchStatus = "yes"
      // } else {
      //   newWatchStatus = "no"
      // }
      db.collection('messages')
      .findOneAndUpdate({ _id: ObjectId(movieId) }, {
        $set: {
          watchedMovieDB: req.body.newWatchStatus === true ? "yes" : "no" //newWatchStatus variable would go here if I used a regular if/else statement
        }
      }, {
        sort: {_id: -1},
        upsert: false
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    app.delete('/messages', (req, res) => {
      const movieId = req.body._id; //receives id from request body
      db.collection('messages').findOneAndDelete({ _id: ObjectId(movieId) }, (err, result) => {
        if (err) return res.send(500, err)
        console.log(result);
        res.send('Message deleted!')
      })
    })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
