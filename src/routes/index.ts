import { Router } from 'express';
import bookingRoutes from './bookingRoutes';
import eventRoutes from './eventRoutes';

const router = Router();

router.use('/booking', bookingRoutes);
router.use('/event', eventRoutes);

export default router;