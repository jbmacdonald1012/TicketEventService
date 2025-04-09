import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking
} from '../controllers/bookingController';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

router.get('/', getAllBookings);
router.get('/:id', getBookingById);
router.post(
  '/',
  [
    body('userId')
      .exists({ checkFalsy: true })
      .withMessage('User ID is required')
      .isMongoId()
      .withMessage('Invalid User ID'),
    body('eventId')
      .exists({ checkFalsy: true })
      .withMessage('Event ID is required')
      .isMongoId()
      .withMessage('Invalid Event ID'),
    body('numberOfTickets')
      .exists({ checkFalsy: true })
      .withMessage('Number of tickets is required')
      .isInt({ min: 1 })
      .withMessage('Number of tickets must be at least 1'),
    body('seatLocations')
      .exists({ checkFalsy: true })
      .withMessage('Seat locations are required')
      .isArray()
      .withMessage('Seat locations must be an array'),
    body('eventDate')
      .exists({ checkFalsy: true })
      .withMessage('Event date is required')
      .isISO8601()
      .withMessage('Invalid event date'),
    body('totalPrice')
      .exists({ checkFalsy: true })
      .withMessage('Total price is required')
      .isFloat({ gt: 0 })
      .withMessage('Total price must be a positive number'),
    body('paymentStatus')
      .exists({ checkFalsy: true })
      .withMessage('Payment status is required')
      .notEmpty()
      .withMessage('Payment status cannot be empty')
  ],
  validateRequest,
  createBooking
);
router.put(
  '/:id',
  [
    body('userId').optional().isMongoId().withMessage('Invalid User ID'),
    body('eventId').optional().isMongoId().withMessage('Invalid Event ID'),
    body('numberOfTickets')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Number of tickets must be at least 1'),
    body('seatLocations').optional().isArray().withMessage('Seat locations must be an array'),
    body('eventDate').optional().isISO8601().withMessage('Invalid event date'),
    body('totalPrice')
      .optional()
      .isFloat({ gt: 0 })
      .withMessage('Total price must be a positive number'),
    body('paymentStatus').optional().notEmpty().withMessage('Payment status cannot be empty')
  ],
  validateRequest,
  updateBooking
);
router.delete('/:id', deleteBooking);

export default router;