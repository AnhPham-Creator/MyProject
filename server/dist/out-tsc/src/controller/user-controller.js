"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var user_model_1 = require("../model/user-model");
var error_middleware_1 = __importDefault(require("../middleware/error.middleware"));
var http_exception_1 = __importDefault(require("../common/http-exception"));
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.init = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_model_1.usermodel.find({})];
                    case 1:
                        users = _a.sent();
                        res.json({
                            users: users
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        error_middleware_1.default(new http_exception_1.default(400, error_1), req, res);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.createUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var input, newUser, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input = {
                            name: req.body.name,
                            birthday: req.body.birthday,
                            email: req.body.email,
                            role: new mongoose_1.Types.ObjectId(req.body.role),
                            tel: req.body.tel
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, user_model_1.usermodel.create(input)];
                    case 2:
                        newUser = _a.sent();
                        res.json({
                            status: 1,
                            message: 'Create success',
                            data: newUser
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        error_middleware_1.default(new http_exception_1.default(400, error_2), req, res);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getUserDetail = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, dataFind, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.params.userId;
                        if (!(userId !== undefined)) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, user_model_1.usermodel.findById({ _id: userId })];
                    case 2:
                        dataFind = _a.sent();
                        if (dataFind !== null) {
                            res.json({
                                status: 1,
                                data: dataFind
                            });
                        }
                        else {
                            res.json({
                                status: 0,
                                message: 'Not Found Data'
                            });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        error_middleware_1.default(new http_exception_1.default(400, error_3), req, res);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.deleteUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, findUser, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.params.userId;
                        if (!(userId !== undefined)) return [3 /*break*/, 7];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, user_model_1.usermodel.findById({ _id: userId })];
                    case 2:
                        findUser = _a.sent();
                        if (!(findUser !== null)) return [3 /*break*/, 4];
                        return [4 /*yield*/, user_model_1.usermodel.deleteOne({ _id: userId })];
                    case 3:
                        _a.sent();
                        res.json({
                            status: 1,
                            message: 'delete susccess',
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        res.json({
                            status: 0,
                            message: 'delete Fail! not found data need delete',
                        });
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_4 = _a.sent();
                        error_middleware_1.default(new http_exception_1.default(400, error_4), req, res);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.updateuser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var input, conditions, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input = req.body;
                        conditions = { email: input.email };
                        console.log(input);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        //let dt = await usermodel.findOneAndUpdate(conditions, input)
                        //console.log(dt)
                        return [4 /*yield*/, user_model_1.usermodel.findByIdAndUpdate(req.body.id, input, { strict: true })];
                    case 2:
                        //let dt = await usermodel.findOneAndUpdate(conditions, input)
                        //console.log(dt)
                        _a.sent();
                        res.status(200).json({
                            status: 1,
                            message: 'update succes'
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        res.status(400).json({
                            error: error_5
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.checkexist = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var email, checkexist, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = req.body.email;
                        if (!(email !== undefined)) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, user_model_1.usermodel.findOne({ email: email })];
                    case 2:
                        checkexist = _a.sent();
                        if (checkexist !== null) {
                            res.json({
                                status: 1,
                                message: 'email already exist!'
                            });
                        }
                        else {
                            res.json({
                                status: 0,
                                message: 'email not exist!'
                            });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_6 = _a.sent();
                        error_middleware_1.default(new http_exception_1.default(400, error_6), req, res);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.default = UserController;
