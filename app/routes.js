
var config        = require('../config');
var utils         = require('./utils');
var multipart     = require('connect-multiparty');


// Controllers
var Account = require('./controllers/account');
var Authenticate  = require('./controllers/authenticate');
var Booth = require('./controllers/booth');
var File = require('./controllers/file');
var Email = require('./controllers/email');
var Follower = require('./controllers/follower');

module.exports = function(app, express) {
  var router = express.Router();

  // Authentication routes
  router.post('/auth', Authenticate.auth);
  router.post('/login', Authenticate.login);
  router.post('/logout', Authenticate.ensureLoggedIn, Authenticate.logout);
  router.post('/signup', Authenticate.signup);
  router.post('/reset', Authenticate.reset);      // Generate a token and send an email to the user with said token
  router.post('/doreset', Authenticate.doreset);  // Check to see if token is correct, and reset the password

  // Support!
  router.post('/contact', Email.contactSupport);

  // Booth Routes (book booth, unbook booth, etc.) ..
  router.post('/getbooths', Booth.getBooths);
  router.post('/bookbooth', Authenticate.ensureLoggedIn, function(req, res) {
    Account.getAccountInformation(req, res, Booth.book);
  });
  router.post('/unbook', Authenticate.ensureLoggedIn, function(req, res) {
    Account.getAccountInformation(req, res, Booth.unbook);
  });

  //File routes
  router.post('/uploadavatar', [Authenticate.ensureLoggedIn, multipart({uploadDir: 'uploads'})], function(req, res) {
    Account.getAccountInformation(req, res, File.handleAvatarComplete);
  });
  router.post('/uploadbanner', [Authenticate.ensureLoggedIn, multipart({uploadDir: 'uploads'})], function(req, res) {
    Account.getAccountInformation(req, res, File.handleBannerComplete);
  });

  // Account management
  router.post('/getaccount', Account.getAccount);
  router.post('/changeaccount', Authenticate.ensureLoggedIn, function(req, res) {
    Account.getAccountInformation(req, res, Account.changeAccount);
  });
  router.post('/getpending', Authenticate.ensureLoggedIn, function(req, res) {
    Account.getAccountInformation(req, res, Account.getPendingVendors);
  });
  router.post('/confirmvendor', Authenticate.ensureLoggedIn, function(req, res) {
    Account.getAccountInformation(req, res, Account.confirmVendor);
  });
  router.post('/denyvendor', Authenticate.ensureLoggedIn, function(req, res) {
    Account.getAccountInformation(req, res, Account.denyVendor);
  });

  // Followers
  router.post('/follow', Authenticate.ensureLoggedIn, function(req, res) {
    Account.getAccountInformation(req, res, Follower.follow);
  });
  router.post('/unfollow', Authenticate.ensureLoggedIn, function(req, res) {
    Account.getAccountInformation(req, res, Follower.unfollow);
  });
  router.post('/getfollowing', Follower.getfollowing);
  router.post('/getfollowers', Follower.getfollowers);
  router.post('/topfollowers', Follower.topfollowers);

  //Return
  return router;
};
