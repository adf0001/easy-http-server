# easy-http-server
easy http server

# Install
```
npm install easy-http-server

//or install globally

npm install -g easy-http-server
```

# Usage & Config
```javascript
var easy_http_server = require('easy-http-server');

var myConfig= {
	http_ip: "127.0.0.1",		//http ip
	http_port: 8070,			//http port

	mime: {
		"*": "text/plain",		//default mime type
		"html": "text/html",
        ...
	},

	//head_text: "<style>a{display:block;}</style>",		//head text for directory browsing

	//root_path: "",			//root path, default is process.cwd()

	//extension: [require("./my-extension.js")],		//extension module list
	//extension_default_process: require("./my-default.js"),		//extension module for default process
}

easy_http_server( myConfig );
```

# CLI

CLI tool is available when installed globally.

Default behavior is an http server browsing current working directory.

```
D:\tmp-20211101> easy-http-server
==================================================
http://127.0.0.1:8070, start at Sat Oct 23 2021 18:10:01 GMT+0800 (GMT+08:00)
root: D:\tmp-20211101
...
```

The CLI tool will load a config file "./easy-http-server-config.js" in current working directory, if existed.

Parameters (ref. Usage & Config) can also be set by command line, or loaded from another file by "--config", or loaded from a json string by "--config".

```
D:\tmp-20211101> easy-http-server --root_path d:\ --http_port 8080 --config "{http_port:8080}" --config "./another-config.js"
==================================================
http://127.0.0.1:8080, start at Sat Oct 23 2021 18:40:47 GMT+0800 (GMT+08:00)
root: d:\
...
```

## config file sample
Config file can be a *.json file, or a *.js file in CommonJs format.

js file
```javascript
module.exports = {
    http_port: 8080,                        //http port
    ...		//ref. Usage & Config
};
```

json file
```json
{
    "http_port": 8080,
    ...
}
```
