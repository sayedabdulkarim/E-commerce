const passport = require('passport')
const User = require('../models/users')
const LocalStratergy = require('passport-local').Strategy

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

passport.use('local.signup', new LocalStratergy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},function (req, email, password, done) {
  req.checkBody('email', 'Invalid Email').notEmpty().isEmail()
  req.checkBody('password', 'Invalid Password').notEmpty().isLength({ min: 5})

  var errors = req.validationErrors();
  if(errors){
    var messages = []
    errors.forEach(err => {
      messages.push(err.msg)
    })
    return done(null, false, req.flash('error', messages))
  }

  User.findOne({'email': email}, (err, user) => {
    if(err){
      return done(err)
    }
    if(user){
      return done(null, false, {message: 'Email is already in use.'})
    }
    var newUser = new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    newUser.save((err, result) => {
      if(err){
        return done(err)
      }
      return done(null, newUser)
    })
  })
}))

passport.use('local.signin', new LocalStratergy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done){
      req.checkBody('email', 'Invalid Email').notEmpty().isEmail()
      req.checkBody('password', 'Invalid Password').notEmpty()

      var errors = req.validationErrors();
      if(errors){
        var messages = []
        errors.forEach(err => {
          messages.push(err.msg)
        })
        return done(null, false, req.flash('error', messages))
      }
            
        User.findOne({'email': email}, (err, user) => {
          if(err){
            return done(err)
          }
          if(!user){
            return done(null, false, {message: 'No user found.'})
          }
          if(!user.validPassword(password)){
            return done(null, false, {message: 'Wrong Password.'})
          }
          return done(null, user)
        })
}))