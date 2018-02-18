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
	  var datasplit = String(resdata).split(']');
	  var enarray = datasplit[0].replace(/\[/g,"");
	  var enarray = enarray.replace(/\n/g,"").trim();
	  console.log(enarray);
	  console.log(datasplit);
	  var resultdata = datasplit[1].replace(/\n/g,"");
	  // console.log(typeof data);
	  var savedata = {};
	  savedata['Original_test'] = input;
	  savedata['encrypted_text'] = resultdata;
	  savedata['en_Array']= enarray;
	  // var save_mongo = new saveinmongo(savedata);
	  var options = { upsert: true, new: true, setDefaultsOnInsert: true };
	  saveinmongo.findOneAndUpdate({Original_test: input}, savedata, options, function(err, task) {
	    if (err)
	      res.send(err);
	    else
	      console.log(task);
	      res.json({result : task.encrypted_text, status: 200});
	  });
	});

	ls.stderr.on('data', (data) => {
	  console.log(`stderr: ${data}`);
	  // res.json({status: 200});
	  console.log("PROBLEM");
	});

	ls.on('close', (code) => {
	  console.log(`child process exited with code ${code}`);
	});
};


exports.decrypt_content = function(req, res) {
	console.log(req.params);
	var decrypttext = req.params.textdata;
	
	console.log(decrypttext);
	saveinmongo.find({'encrypted_text' : decrypttext}, function(err, task) {
	    if (err)
	      res.send(err);
	    console.log(task[0].en_Array);
	    const spawn = require('child_process').spawn;
	    const ls = spawn('python', ['decryption1.py', decrypttext, task[0].en_Array]);
	    ls.stdout.on('data', (data) => {
		  console.log(`stdout: ${data}`);
		  console.log(data);
		  res.send(data);
		  });
		ls.stderr.on('data', (data) => {
		  console.log(`stderr: ${data}`);
		  // res.json({status: 200});
		  console.log("PROBLEM");
		});

		ls.on('close', (code) => {
		  console.log(`child process exited with code ${code}`);
		});
	 });
	
};

