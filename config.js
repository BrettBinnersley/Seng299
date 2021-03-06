module.exports = {
	'port': process.env.PORT || 8080,
  'expiryInSeconds': 2678400,
  secure: false,   // We don't have an ssl cert (and won't for this class)
  httpOnly: true,
  'uploads': 'uploads',
	'database': 'mongodb://localhost:27017/nodeDB',
	'secret': 'seng299Group6Secret',
  'cookieName': 'seng299Group6Cookie',
  'server': 'localhost:8080',

  "email": {
    "from": "group6@seng299.web",
    "port": 1025,
    "host": "localhost",
    "secure": false, // No ssl
    "auth": {
      "user": "",
      "pass": ""
    }
  }

};
