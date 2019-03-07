const express = require('express')
const router = express.Router()
const passport = require('passport')

const csrf = require('csurf')

const csrfProtection = csrf()
router.use(csrfProtection)

//profile
router.get('/profile', isLoggedin, (req, res) => {
  res.render('user/profile', {title: "My Express"})
})

//logout
router.get('/logout', isLoggedin, (req, res) => {
  req.logout()
  res.redirect('/')
})

router.use('/', notLoggedin, (req, res, next) => {
  next()
})

//signup-get

router.get('/signup', (req, res) => {
  var messages =  req.flash('error')
  res.render('user/signup', {title: "My Express", csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 })
})
//signup-post
router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}))

//signin
router.get('/signin', (req, res) => {
  var messages =  req.flash('error')
  res.render('user/signin', {title: "My Express", csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 })
})

router.post('/signin', passport.authenticate('local.signin', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}))

module.exports = router

function isLoggedin (req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
  else{
    res.redirect('/')
  }
}

function notLoggedin (req, res, next){
  if(!req.isAuthenticated()){
    return next()
  }
  else{
    res.redirect('/')
  }
}