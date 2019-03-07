const express = require('express')
const expressLayouts = require('express-ejs-layouts')

//session
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')

//validation
const validator = require('express-validator')
var MongoStore = require('connect-mongo')(session)
//db
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://sayedabdul:sayed4747@todo-wkuw1.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
  .then(() => console.log('mongo connected'))
  .catch(err => console.log(err))
  require('./config/passport')
  require('./models/products')
  require('./seeds/productseeder')

//routes path
const routes = require('./routes/index')
const userRoutes = require('./routes/user')

const app = express()

//middleware
app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 180 * 60 * 1000 }
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({ extended: false}))
app.use(validator())
app.use(express.static('./public'))
app.use(expressLayouts)                   
app.set('view engine', 'ejs')

app.use( function (req, res, next) {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next()
})

//routes
app.use('/user', userRoutes)
app.use('/', routes)



app.listen(3000)