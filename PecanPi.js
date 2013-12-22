var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
		log4js = require("log4js"),
    port = 8888;

// set up logging
var _logger = log4js.getLogger("PecanPi");
_logger.setLevel("Info");

http.createServer(function(request, response){
	var uri = url.parse(request.url).pathname;

	if(uri == "/"){
		uri = "/index.html";
	}

	var filename = path.join(process.cwd(), uri);

  _logger.info("Requested for " + uri + " and the file name is " + filename);

	fs.stat(filename, function(err, stat){
		if(err){
			_logger.error("Error while searching for files: " + err);	

			reportError(err, response);
		}else{
			if(stat.isDirectory()){
				
				filename += "/index.html";
				_logger.info("Transformed the file to look for to " + filename);
			}

			fs.readFile(filename, "binary", function(fileErr, file){
				if(fileErr){
					_logger.error("Error while reading file " + file + " Error: " + fileErr);
					reportError(fileErr, response);
					return;
				}

				response.writeHead(200);
				response.write(file, "binary");
				response.end();

				_logger.info("Finished writing output");
			})	
		}
	});

}).listen(port);

_logger.info("Started server running at port " + port);

function reportError(err, response){
	response.writeHead(500, {"Content-Type": "text/plain"});
	response.write("Errors while processing your requests. Please try a different request.\n");
	response.end();
}
