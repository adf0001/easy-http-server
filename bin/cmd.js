#!/usr/bin/env node

//load config

var cfg, k, v;
try { cfg = require(process.cwd() + "/easy-http-server-config.js"); } catch (ex) { cfg = {}; }

for (var i = 0; i < process.argv.length; i++) {
	if ((k = process.argv[i]).slice(0, 2) !== "--") continue;
	if (!(v = process.argv[i + 1]) || v.slice(0, 2) === "--") continue;

	if (v.charAt(0) == "{" && v.slice(-1) == "}") v = eval("(" + v + ")");	//json string
	else if (v.charAt(0) === ".") v = process.cwd() + "/" + v;		//file path

	k = k.slice(2);
	if (k === "config") Object.assign(cfg, (typeof v === "string") ? require(v) : v);
	else cfg[k] = v;

	i++;
}

//run

require('../easy-http-server.js')(cfg);
