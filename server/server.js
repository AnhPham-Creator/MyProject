"use strict";
exports.__esModule = true;
var app_1 = require("./app");
var dotenv_1 = require("dotenv");
var mongoose_1 = require("mongoose");
dotenv_1["default"].config();
mongoose_1["default"].connect('mongodb://localhost/firstapp', { useNewUrlParser: true, useUnifiedTopology: true });
var PORT = process.env.PORT || 3000;
app_1["default"].listen(PORT, function () {
    console.log('listening on port ' + PORT);
});
