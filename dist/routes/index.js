"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookingRoutes_1 = __importDefault(require("./bookingRoutes"));
const eventRoutes_1 = __importDefault(require("./eventRoutes"));
const express_openid_connect_1 = require("express-openid-connect");
const router = (0, express_1.Router)();
router.use('/bookings', (0, express_openid_connect_1.requiresAuth)(), bookingRoutes_1.default);
router.use('/events', (0, express_openid_connect_1.requiresAuth)(), eventRoutes_1.default);
exports.default = router;
