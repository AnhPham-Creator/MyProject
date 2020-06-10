"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var notFoundHandler = function (request, response, next) {
    var message = "Resource not found";
    response.status(404).send(message);
};
exports.default = notFoundHandler;
