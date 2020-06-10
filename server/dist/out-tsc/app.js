"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var user_router_1 = __importDefault(require("./src/router/user-router"));
var body_parser_1 = __importDefault(require("body-parser"));
var App = /** @class */ (function () {
    function App() {
        this.Routes = new user_router_1.default();
        this.app = express_1.default();
        this.config();
        this.Routes.routes(this.app);
    }
    App.prototype.config = function () {
        this.app.set('view engine', 'ejs');
        this.app.set('views', './views');
        this.app.use(cors_1.default());
        this.app.use(body_parser_1.default.json({ limit: "50mb" }));
        this.app.use(body_parser_1.default.urlencoded({
            limit: "50mb",
            extended: true,
            parameterLimit: 50000
        }));
        this.app.use(express_1.default.static('public'));
        // this.app.use(errorHandler);
        // this.app.use(notFoundHandler);
    };
    return App;
}());
exports.default = new App().app;
