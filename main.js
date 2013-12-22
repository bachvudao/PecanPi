var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    port = 8888;

http.createServer(function(request, response){
	var uri = url.parse(request.url).pathname;

	if(uri == "/"){
		uri = "/index.html";
	}

	var filename = path.join(process.cwd(), uri);


	console.log("Requested for " + uri + " and the file name is " + filename);

	fs.exists(filename, function(exists) {
		if(!exists){

			console.log("No such file is found");

			response.writeHead(404, {"Content-Type": "text/plain"});
			response.write("404 Not Found\n");
			response.end();
			return;
		}
	});

	if(fs.statSync(filename).isDirectory()){
		filename += "/index.html";

		console.log("Transformed the file to look for to " + filename);
	}	

	fs.readFile(filename, "binary", function(err, file){
		if(err){
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(err + "\n");
			response.end();
			return;
		}

		response.writeHead(200);
		response.write(file, "binary");
		response.end();

		console.log("Finished writing output");
	});

}).listen(port);

console.log("Started server running at port " + port);


