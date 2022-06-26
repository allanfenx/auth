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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceivedUser = void 0;
var typeorm_1 = require("typeorm");
var app_1 = require("../app");
var ReceivedUserRepositories_1 = require("../repositories/ReceivedUserRepositories");
var ReceivedUser = /** @class */ (function () {
    function ReceivedUser() {
    }
    ReceivedUser.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, app_1.consumerSave.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, app_1.consumerSave.subscribe({ topic: "create_user", fromBeginning: true })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, app_1.consumerSave.run({
                                eachMessage: function (_a) {
                                    var topic = _a.topic, partition = _a.partition, message = _a.message;
                                    return __awaiter(_this, void 0, void 0, function () {
                                        var value, _b, user_id, email, hashPassoword, role, name, repository, user, error_1;
                                        return __generator(this, function (_c) {
                                            switch (_c.label) {
                                                case 0:
                                                    value = message.value;
                                                    _b = JSON.parse(value.toString()), user_id = _b.user_id, email = _b.email, hashPassoword = _b.hashPassoword, role = _b.role, name = _b.name;
                                                    repository = (0, typeorm_1.getCustomRepository)(ReceivedUserRepositories_1.ReceivedUserRepositories);
                                                    _c.label = 1;
                                                case 1:
                                                    _c.trys.push([1, 3, , 4]);
                                                    user = repository.create({ registerId: user_id, email: email, password: hashPassoword, role: role, name: name });
                                                    return [4 /*yield*/, repository.save(user)];
                                                case 2:
                                                    _c.sent();
                                                    return [3 /*break*/, 4];
                                                case 3:
                                                    error_1 = _c.sent();
                                                    throw error_1;
                                                case 4: return [2 /*return*/];
                                            }
                                        });
                                    });
                                }
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ReceivedUser.prototype.update = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, app_1.consumerUpdate.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, app_1.consumerUpdate.subscribe({ topic: "update_user", fromBeginning: true })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, app_1.consumerUpdate.run({
                                eachMessage: function (_a) {
                                    var topic = _a.topic, partition = _a.partition, message = _a.message;
                                    return __awaiter(_this, void 0, void 0, function () {
                                        var value, _b, user_id, email, role, repository, user, error_2;
                                        return __generator(this, function (_c) {
                                            switch (_c.label) {
                                                case 0:
                                                    value = message.value;
                                                    _b = JSON.parse(value.toString()), user_id = _b.user_id, email = _b.email, role = _b.role;
                                                    repository = (0, typeorm_1.getCustomRepository)(ReceivedUserRepositories_1.ReceivedUserRepositories);
                                                    _c.label = 1;
                                                case 1:
                                                    _c.trys.push([1, 4, , 5]);
                                                    return [4 /*yield*/, repository.findOne({ registerId: user_id })];
                                                case 2:
                                                    user = _c.sent();
                                                    return [4 /*yield*/, repository.update(user.registerId, { role: role })];
                                                case 3:
                                                    _c.sent();
                                                    return [3 /*break*/, 5];
                                                case 4:
                                                    error_2 = _c.sent();
                                                    throw error_2;
                                                case 5: return [2 /*return*/];
                                            }
                                        });
                                    });
                                }
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ReceivedUser.prototype.remove = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, app_1.consumerRemove.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, app_1.consumerRemove.subscribe({ topic: "test", fromBeginning: true })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, app_1.consumerRemove.run({
                                eachMessage: function (_a) {
                                    var topic = _a.topic, partition = _a.partition, message = _a.message;
                                    return __awaiter(_this, void 0, void 0, function () {
                                        var value, user_id, repository, user, error_3;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    value = message.value;
                                                    user_id = JSON.parse(value.toString()).user_id;
                                                    repository = (0, typeorm_1.getCustomRepository)(ReceivedUserRepositories_1.ReceivedUserRepositories);
                                                    _b.label = 1;
                                                case 1:
                                                    _b.trys.push([1, 4, , 5]);
                                                    return [4 /*yield*/, repository.findOneOrFail(user_id)];
                                                case 2:
                                                    user = _b.sent();
                                                    return [4 /*yield*/, repository.remove(user)];
                                                case 3:
                                                    _b.sent();
                                                    return [3 /*break*/, 5];
                                                case 4:
                                                    error_3 = _b.sent();
                                                    throw error_3;
                                                case 5: return [2 /*return*/];
                                            }
                                        });
                                    });
                                }
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ReceivedUser;
}());
exports.ReceivedUser = ReceivedUser;
