import express from 'express';
import {
  getReports,
  createReport,
  getReportById,
  updateReport,
  deleteReport,
  exportReport
} from '../controllers/reportController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getReports)
  .post(protect, createReport);

router.route('/:id')
  .get(getReportById)
  .put(protect, updateReport)
  .delete(protect, deleteReport);

router.get('/:id/export', exportReport);

export default router;
