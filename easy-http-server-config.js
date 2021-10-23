
module.exports = {
	http_ip: "127.0.0.1",		//http ip
	http_port: 8070,			//http port

	mime: {
		"*": "text/plain",		//default mime type

		"html": "text/html",
		"htm": "text/html",
		"jpg": "image/jpg",
		"css": "text/css",
		"js": "text/javascript",
		"bat": "text/bat",
		"txt": "text/plain",
		"md": "text/x-markdown",
	},

	head_text: "<style>a{display:block;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;text-decoration:none;}a:hover{text-decoration:underline;}div{column-width:10em;}</style>",		//head text for directory browsing

	//root_path: "",			//root path, default is process.cwd()

	//extension: [require("./my-extension.js")],		//extension module list
	//extension_default_process: require("./my-default.js"),		//extension module for default process

};
