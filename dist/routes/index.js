"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookingRoutes_1 = __importDefault(require("./bookingRoutes"));
const eventRoutes_1 = __importDefault(require("./eventRoutes"));
const router = (0, express_1.Router)();
router.use('/bookings', bookingRoutes_1.default);
router.use('/events', eventRoutes_1.default);
exports.default = router;
