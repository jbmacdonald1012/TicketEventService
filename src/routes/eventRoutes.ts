import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from '../controllers/eventController';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required.'),
    body('description').notEmpty().withMessage('Description is required.'),
    body('eventDate').isISO8601().withMessage('Event date must be a valid date.'),
    body('city').notEmpty().withMessage('City is required.'),
    body('venue').notEmpty().withMessage('Venue is required.'),
    body('seatsAvailable')
      .isInt({ min: 1 })
      .withMessage('Seats available must be an integer greater than 0.'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number.')
  ],
  validateRequest,
  createEvent
);
router.put(
  '/:id',
  [
    body('title').notEmpty().withMessage('Title is required.'),
    body('description').notEmpty().withMessage('Description is required.'),
    body('eventDate').isISO8601().withMessage('Event date must be a valid date.'),
    body('city').notEmpty().withMessage('City is required.'),
    body('venue').notEmpty().withMessage('Venue is required.'),
    body('seatsAvailable')
      .isInt({ min: 1 })
      .withMessage('Seats available must be an integer greater than 0.'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number.')
  ],
  validateRequest,
  updateEvent
);
router.delete('/:id', deleteEvent);

export default router;
