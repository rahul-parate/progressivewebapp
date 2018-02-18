'use strict';



module.exports = function(app) {
  var controllervar = require('../controller/apiController.js');


    app.get('/', function(req, res) {
        res.sendFile('./public/index.html');
    });
  

  app.route('/postcontent/:content')
    .post(controllervar.encrypt_content);

};

