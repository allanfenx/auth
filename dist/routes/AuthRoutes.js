"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthController_1 = require("../controllers/AuthController");
var router = (0, express_1.Router)();
var controller = new AuthController_1.AuthController();
router.post("/auth", controller.authenticade);
exports.default = router;
