'use strict';


var mongoose = require('mongoose'),
  saveinmongo = mongoose.model('saveinmongo');

exports.encrypt_content = function(req, res) {
	console.log(req.params);
	// res.send("Hello");
	var input = req.params.content;
	const spawn = require('child_process').spawn;
	const ls = spawn('python', ['encryption.py', input]);

	ls.stdout.on('data', (data) => {
	  console.log(`stdout: ${data}`);
	  var resdata =  data;
	  console.log(typeof data);
	  var savedata = {};
	  savedata['Original_test'] = input;
	  savedata['encrypted_text'] = resdata;
	  var save_mongo = new saveinmongo(savedata);
	  save_mongo.save(function(err, task) {
	    if (err)
	      res.send(err);
	    console.log(task);
	    res.json({result : task.encrypted_text, status: 200});
	  });
	});

	ls.stderr.on('data', (data) => {
	  console.log(`stderr: ${data}`);
	  res.json({status: 200});
	  console.log("PROBLEM");
	});

	ls.on('close', (code) => {
	  console.log(`child process exited with code ${code}`);
	});
};




