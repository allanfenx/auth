"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const router = (0, express_1.Router)();
const controller = new AuthController_1.AuthController();
router.post("/auth", controller.authenticade);
exports.default = router;
