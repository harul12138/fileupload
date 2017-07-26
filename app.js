var fs = require('fs'); 
var express = require('express'); 
var multer  = require('multer') 
var path = require('path')
var http = require("http");
var url = require("url");
var JSZip = require("jszip");

var app = express(); 

app.use(express.static(path.join(__dirname, 'public')))

const storage = multer.diskStorage({
	  destination: function (req, file, cb) {
	    cb(null, path.resolve('public/uploads'));
	  },
	  filename: function (req, file, cb) {
	    cb(null, Date.now() + path.extname(file.originalname));
	  }
	});

var upload = multer({storage: storage});

app.post('/upload', upload.single('avatar'), function(req, res, next) {
	var file = req.file;
	console.log('type：%s', file.mimetype);		
res.send({ err: null,filePath: 'uploads/' + path.basename(req.file.path) });

if(file.mimetype="application/zip"){

}
	});
  
app.listen(3000, function () {
	console.log('app listening on port 3000!')

	})
