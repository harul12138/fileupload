var fs = require('fs'); 
var express = require('express'); 
var multer  = require('multer') 
var path = require('path')
var http = require("http");
var url = require("url");
var AdmZip = require('adm-zip');

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
	console.log('name：%s', file.path);	
	//var path = 'uploads/' + path.basename(req.file.path);

res.send({ err: null,filePath: 'uploads/' + path.basename(req.file.path) });

if(file.mimetype="application/zip"){
	// reading archives
	var zip = new AdmZip(file.path);
	var zipEntries = zip.getEntries(); // an array of ZipEntry records
	zipEntries.forEach(function(zipEntry) {
	    console.log(zipEntry.entryName.toString().split("/").pop()); 
	  //  res.render('index.html',{url:zipEntry.entryName.toString()});
	});
}
	});
  
app.listen(3000, function () {
	console.log('app listening on port 3000!')

	})
