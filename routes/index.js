const express = require('express')
const router = express.Router()
var Cart = require('../models/cart')
const Product = require('../models/products')


//home page
router.get('/', (req, res) => {
  var successMsg = req.flash('success')[0];
  Product.find( function (err, data) {
     res.render('shop/index', {title: 'My Express', List: data, successMsg: successMsg, noMessage: !successMsg}) 
  })
})

//cart-add
router.get('/addcart/:id', function (req, res) {
  var  productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});
  
  Product.findById(productId, function(err, product){
    if(err){
      return res.redirect('/')
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart)
    res.redirect('/')
  })
})

//shopping cart
router.get('/shoppingcart', (req, res) => {
  if(!req.session.cart){
    res.render('shop/shoppingcart', {products: null, title: 'My Express'})
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shoppingcart', {title: 'My Express',products: cart.generateArray(), totalPrice: cart.totalPrice})
})

//checkout
router.get('/checkout', (req, res) => {
  if(!req.session.cart){
   return res.redirect('/shoppingcart')
  }
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash('error')[0];
  res.render('shop/checkout', {title: 'My Express',total: cart.totalPrice, errMsg: errMsg, noError: !errMsg })
})

//stripecheckout-post
router.post('/checkout', (req, res) => {
  if(!req.session.cart){
   return res.redirect('/shoppingcart')
  }

  var cart = new Cart(req.session.cart);

  var stripe = require("stripe")("sk_test_5npS1m5eV0chX68hkjTcKAch");

  stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: "inr",
    source: req.body.stripeToken, // obtained with Stripe.js
    description: "Test Charge"
  }, function(err, charge) {
    // asynchronously called
    if(err){
      req.flash('error', err.message)
      return res.redirect('/checkout')
    }
    req.flash('success', 'Successfully bought product.')
    req.session.cart = null;
    res.redirect('/');
  });
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//dlelete all files
router.delete('/', (req, res) => {
  Product.deleteMany({}, (err, data) => {
    if(err){
      console.log(err)
    }
    else{ 
      res.send('data deleted')
    }
  })
})

module.exports = router