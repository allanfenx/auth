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
exports.consumerRemove = exports.consumerUpdate = exports.consumerSave = void 0;
require("reflect-metadata");
require("./database/connection");
var express_1 = __importDefault(require("express"));
var kafkajs_1 = require("kafkajs");
var cors_1 = __importDefault(require("cors"));
var ReceivedUser_1 = require("./kafka/ReceivedUser");
var AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
var kafka = new kafkajs_1.Kafka({
    clientId: 'auth',
    brokers: ['localhost:9092'],
});
exports.consumerSave = kafka.consumer({ groupId: "save" });
exports.consumerUpdate = kafka.consumer({ groupId: "update" });
exports.consumerRemove = kafka.consumer({ groupId: "remove" });
var app = (0, express_1.default)();
var port = 8085;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(AuthRoutes_1.default);
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var received;
        return __generator(this, function (_a) {
            received = new ReceivedUser_1.ReceivedUser();
            received.save();
            received.update();
            received.remove();
            app.listen(port, function () {
                console.log("Aplication running!");
            });
            return [2 /*return*/];
        });
    });
}
run().catch(console.error);
