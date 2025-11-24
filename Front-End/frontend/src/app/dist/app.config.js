"use strict";
exports.__esModule = true;
exports.appConfig = void 0;
var router_1 = require("@angular/router");
var http_1 = require("@angular/common/http");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var app_routes_1 = require("./app.routes");
exports.appConfig = {
    providers: [
        router_1.provideRouter(app_routes_1.routes, router_1.withComponentInputBinding()),
        http_1.provideHttpClient(http_1.withFetch()),
        animations_1.provideAnimations(),
        platform_browser_1.provideClientHydration(),
    ]
};
