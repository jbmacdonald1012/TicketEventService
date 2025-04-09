import { Router } from 'express';
import bookingRoutes from './bookingRoutes';
import eventRoutes from './eventRoutes';
import { requiresAuth } from 'express-openid-connect';

const router = Router();

router.use('/bookings', requiresAuth(), bookingRoutes);
router.use('/events', requiresAuth(), eventRoutes);

export default router;