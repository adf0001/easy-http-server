
rem chcp 65001

set supervisorPath=supervisor.cmd

title supervisor - easy-http-server - %CD%

set thisPath=%~dp0

%supervisorPath% -w "%thisPath%easy-http-server.js,%thisPath%easy-http-server-config.js" -RV "%thisPath%bin/cmd.js"
