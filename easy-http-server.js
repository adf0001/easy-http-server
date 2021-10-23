
var http = require("http");
var fs = require("fs");
var path = require("path");
//var url = require("url");

var default_config = require("./easy-http-server-config.js");

//process to browse directories and files, config= { ..., filePath, isRoot }
var browse_process = function (req, res, config) {
	var { filePath, isRoot } = config;

	if (!filePath) {
		//filePath = decodeURIComponent(url.parse(req.url).pathname);		//The Legacy URL API is deprecated?
		filePath = decodeURIComponent((new URL(req.url, "http://any/")).pathname);		//crap code by WHATWG URL API
		console.log("browse: " + filePath);
		isRoot = (filePath === "/");

		filePath = config.root_path + filePath;
	}

	//directory
	if (filePath.match(/[\\\/]$/)) {
		fs.readdir(filePath, { withFileTypes: true }, function (err, data) {
			if (err) { console.log(err); res.writeHead(500, { "Content-type": "text/plain;charset=UTF-8" }); res.end("" + err); return; }
			var a = data.map(v => { var dirSlash = v.isDirectory() ? "/" : ""; return "<a href='" + v.name + dirSlash + "'>" + dirSlash + v.name + "</a>"; });
			res.writeHead(200, { "Content-type": "text/html;charset=UTF-8" });
			res.end(config.head_text + "<div>" + (isRoot ? "" : "<a href='../'>/..</a>") + a.join("") + "</div>");
		});
		return true;
	}

	//file
	fs.readFile(filePath, function (err, data) {
		if (err) {
			if (err.code === "ENOENT") { res.writeHead(404, { "Content-type": "text/plain" }); res.end("404 NOT FOUND"); }
			else { console.log(err); res.writeHead(500, { "Content-type": "text/plain;charset=UTF-8" }); res.end("" + err); }
			return;
		};

		var mime = config.mime;
		res.writeHead(200, { "Content-type": mime[path.extname(filePath).toLowerCase().slice(1)] || mime["*"] || "application/octet-stream" });
		res.end(data);
	});

	return true;
}

module.exports = function (userConfig) {
	//config
	var config = Object.assign(Object.create(default_config), userConfig || {});

	["mime"].map(v => {		//combine sub object
		config[v] = Object.assign(Object.create(default_config[v]), (userConfig && userConfig[v]) || {});
	});

	//default root path
	if (!config.root_path) config.root_path = process.cwd();

	//extension
	var extension = config.extension || [];

	//default_process
	var default_process = config.extension_default_process || browse_process;
	config.default_process = default_process;

	//start
	console.log("=".repeat(50));
	console.log("http://" + config.http_ip + ":" + config.http_port + ", start at " + (new Date()));
	console.log("root: " + config.root_path);

	http.createServer(function (req, res) {
		for (var i in extension) { if (extension[i](req, res, config)) return; }

		default_process(req, res, config);

	}).listen(config.http_port, config.http_ip);
}
