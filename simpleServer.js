var http = require('http'),
	fs = require('fs'),
	path = require('path'), 
	host = '127.0.0.1' ,
	port = '9000';

var mimes = {
	".hmt" : "text/html",
	".css" : "text/css",
	".js" : "text/javascript",
	".gif" : "image/gif",
	".jpg" : "image/jpg",
	".png" : "image/png"
}

var server = http.createServer(function(req, res){
	console.log('createServer: enter');
	var filepath = (req.url === '/') ? ('./Basic_Web_Server_Begin/index.htm') : ('./Basic_Web_Server_Begin' + req.url);
	var contentType = mimes[path.extname(filepath)];
	console.log('Fecthing file: ' + filepath);
	//check to see if the file exists
	fs.exists(filepath, function(file_exists){
		if (file_exists){
			console.log('file exists: ' + filepath);
	
			//Read and serve
			fs.readFile(filepath, function(error, content){
				if (error){
					res.writeHead(500);
					res.end();
				} else {
					res.writeHead(200, {'Content-Type' : contentType});
					res.end(content, 'utf-8');
				}
			})

		} else{
			res.writeHead(404);
			res.end("Sorry we could not find the file you requested !");
		}
	})
}).listen(port, host, function(){
	console.log('Server Running on http://' + host + ":" + port);
});
