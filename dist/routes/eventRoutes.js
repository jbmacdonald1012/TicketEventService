"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const eventController_1 = require("../controllers/eventController");
const validateRequest_1 = require("../middleware/validateRequest");
const router = (0, express_1.Router)();
router.get('/', eventController_1.getAllEvents);
router.get('/:id', eventController_1.getEventById);
router.post('/', [
    (0, express_validator_1.body)('title').notEmpty().withMessage('Title is required.'),
    (0, express_validator_1.body)('description').notEmpty().withMessage('Description is required.'),
    (0, express_validator_1.body)('eventDate').isISO8601().withMessage('Event date must be a valid date.'),
    (0, express_validator_1.body)('city').notEmpty().withMessage('City is required.'),
    (0, express_validator_1.body)('venue').notEmpty().withMessage('Venue is required.'),
    (0, express_validator_1.body)('seatsAvailable')
        .isInt({ min: 1 })
        .withMessage('Seats available must be an integer greater than 0.'),
    (0, express_validator_1.body)('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number.')
], validateRequest_1.validateRequest, eventController_1.createEvent);
router.put('/:id', [
    (0, express_validator_1.body)('title').notEmpty().withMessage('Title is required.'),
    (0, express_validator_1.body)('description').notEmpty().withMessage('Description is required.'),
    (0, express_validator_1.body)('eventDate').isISO8601().withMessage('Event date must be a valid date.'),
    (0, express_validator_1.body)('city').notEmpty().withMessage('City is required.'),
    (0, express_validator_1.body)('venue').notEmpty().withMessage('Venue is required.'),
    (0, express_validator_1.body)('seatsAvailable')
        .isInt({ min: 1 })
        .withMessage('Seats available must be an integer greater than 0.'),
    (0, express_validator_1.body)('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number.')
], validateRequest_1.validateRequest, eventController_1.updateEvent);
router.delete('/:id', eventController_1.deleteEvent);
exports.default = router;
