"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_controller_1 = __importDefault(require("../controller/user-controller"));
var validator_middleware_1 = require("../middleware/validator.middleware");
var Routes = /** @class */ (function () {
    function Routes() {
        this.UserController = new user_controller_1.default();
    }
    Routes.prototype.routes = function (app) {
        var _this = this;
        app.route('/api/view-user')
            .get(function (req, res) {
            _this.UserController.init(req, res);
        })
            .post(function (req, res, next) {
            validator_middleware_1.validatormiddleware(req, res, next);
            _this.UserController.createUser(req, res);
        })
            .put(function (req, res, next) {
            validator_middleware_1.validatormiddleware(req, res, next);
            _this.UserController.updateuser(req, res);
        });
        app.route('/api/view-user/:userId')
            .get(function (req, res) {
            _this.UserController.getUserDetail(req, res);
        })
            .delete(function (req, res) {
            _this.UserController.deleteUser(req, res);
        });
        app.route('/api/register/checkexist')
            .post(function (req, res) {
            _this.UserController.checkexist(req, res);
        });
    };
    return Routes;
}());
exports.default = Routes;
