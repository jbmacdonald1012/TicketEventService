"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const bookingController_1 = require("../controllers/bookingController");
const validateRequest_1 = require("../middleware/validateRequest");
const router = (0, express_1.Router)();
router.get('/', bookingController_1.getAllBookings);
router.get('/:id', bookingController_1.getBookingById);
router.post('/', [
    (0, express_validator_1.body)('userId')
        .exists({ checkFalsy: true })
        .withMessage('User ID is required')
        .isMongoId()
        .withMessage('Invalid User ID'),
    (0, express_validator_1.body)('eventId')
        .exists({ checkFalsy: true })
        .withMessage('Event ID is required')
        .isMongoId()
        .withMessage('Invalid Event ID'),
    (0, express_validator_1.body)('numberOfTickets')
        .exists({ checkFalsy: true })
        .withMessage('Number of tickets is required')
        .isInt({ min: 1 })
        .withMessage('Number of tickets must be at least 1'),
    (0, express_validator_1.body)('seatLocations')
        .exists({ checkFalsy: true })
        .withMessage('Seat locations are required')
        .isArray()
        .withMessage('Seat locations must be an array'),
    (0, express_validator_1.body)('eventDate')
        .exists({ checkFalsy: true })
        .withMessage('Event date is required')
        .isISO8601()
        .withMessage('Invalid event date'),
    (0, express_validator_1.body)('totalPrice')
        .exists({ checkFalsy: true })
        .withMessage('Total price is required')
        .isFloat({ gt: 0 })
        .withMessage('Total price must be a positive number'),
    (0, express_validator_1.body)('paymentStatus')
        .exists({ checkFalsy: true })
        .withMessage('Payment status is required')
        .notEmpty()
        .withMessage('Payment status cannot be empty')
], validateRequest_1.validateRequest, bookingController_1.createBooking);
router.put('/:id', [
    (0, express_validator_1.body)('userId').optional().isMongoId().withMessage('Invalid User ID'),
    (0, express_validator_1.body)('eventId').optional().isMongoId().withMessage('Invalid Event ID'),
    (0, express_validator_1.body)('numberOfTickets')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Number of tickets must be at least 1'),
    (0, express_validator_1.body)('seatLocations').optional().isArray().withMessage('Seat locations must be an array'),
    (0, express_validator_1.body)('eventDate').optional().isISO8601().withMessage('Invalid event date'),
    (0, express_validator_1.body)('totalPrice')
        .optional()
        .isFloat({ gt: 0 })
        .withMessage('Total price must be a positive number'),
    (0, express_validator_1.body)('paymentStatus').optional().notEmpty().withMessage('Payment status cannot be empty')
], validateRequest_1.validateRequest, bookingController_1.updateBooking);
router.delete('/:id', bookingController_1.deleteBooking);
exports.default = router;
