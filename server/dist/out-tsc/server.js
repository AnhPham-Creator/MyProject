"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var dotenv_1 = __importDefault(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
mongoose_1.default.connect('mongodb://localhost/firstapp', { useNewUrlParser: true, useUnifiedTopology: true });
var PORT = process.env.PORT || 3000;
app_1.default.listen(PORT, function () {
    console.log('listening on port ' + PORT);
});
