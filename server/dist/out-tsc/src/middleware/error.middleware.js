"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorHandler = function (error, request, response, next) {
    var status = error.statusCode || 500;
    var message = error.message || "It's not you. It's us. We are having some problems.";
    response.status(status).send(message);
};
exports.default = errorHandler;
