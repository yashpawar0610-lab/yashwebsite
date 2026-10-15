import express from 'express';
import { getStats, getCharts, getActivity } from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/stats', getStats);
router.get('/charts', getCharts);
router.get('/activity', getActivity);

export default router;
