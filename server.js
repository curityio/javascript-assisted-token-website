var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

// Take the listening port as argument
var port = (process.argv.length > 2 ? process.argv[2] : 8080);

var handleFileRequest = function(request, response, pathname) {

    console.log("Serving file");

    var filePath = '.' + pathname;

    console.log("filePath = " + filePath);

    if (filePath == './')
        filePath = './index.html';

    if (filePath.indexOf("/", filePath.length - "/".length) !== -1) {
        filePath = filePath + 'index.html';
    }

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }

    fs.exists(filePath, function (exists) {

        if (exists) {
            fs.readFile(filePath, function (error, content) {
                if (error) {
                    response.writeHead(500);
                    response.end();
                }
                else {
                    response.writeHead(200, {'Content-Type': contentType});
                    response.end(content, 'utf-8');
                }
            });
        }
        else {
            response.writeHead(404);
            response.end();
        }
    });
};

var handleApiRequest = function(request, response, apiHandler) {

    console.log("Serving API");

    // Employing very forgiving CORS, so this API-endpoint can be called from another origin;
    // E.g. when running multiple instances of this server that makes API-calls between each other.
    var responseHeaders = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Authorization'
    };

    // Making the naive assumption that any OPTIONS request is the user-agent making a cross-site preflighted request.
    if (request.method === 'OPTIONS') {
        console.log("Accepting probable preflight request");

        response.writeHead(200, responseHeaders);
        response.end();
        return;
    }

    var message;
    var status;

    var authorizeHeader = request.headers['authorization'];

    if (authorizeHeader !== undefined) {
        status = 200;
        var token = authorizeHeader.substring('Bearer '.length);
        message = apiHandler(token);
    } else {
        status = 401;
        message = "No token included in API call";
        console.log("No token on request");
    }

    if (!response.finished) {
        console.log("handleApiRequest: Ending response");
    }
};

http.createServer(function (request, response) {

    console.log('request starting...');

    var pathname = url.parse(request.url, true).pathname;

    if (pathname === '/api') {
        handleApiRequest(request, response, function(token) {
            console.log("Token on request: " + token);

            response.end("API accessed with token " + token, 'utf-8');
        });
    } else {
        handleFileRequest(request, response, pathname);
    }

}).listen(port);

console.log('Server running at http://127.0.0.1:%d/', port);
