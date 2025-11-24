"use strict";
exports.__esModule = true;
exports.config = void 0;
var core_1 = require("@angular/core");
var app_config_1 = require("./app.config");
var platform_server_1 = require("@angular/platform-server");
var serverConfig = {
    providers: [
        platform_server_1.provideServerRendering()
    ]
};
exports.config = core_1.mergeApplicationConfig(app_config_1.appConfig, serverConfig);
