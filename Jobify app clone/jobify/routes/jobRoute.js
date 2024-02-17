import express from 'express';
import {
  createjob,
  deleteJob,
  getAllJob,
  updateJob,
  showStats,
} from '../controllers/jobControllers.js';
import testUser from '../middleware/testUser.js';

const router = express.Router();

router.route('/').post(testUser, createjob).get(getAllJob);
router.route('/stats').get(showStats);
router.route('/:id').delete(testUser, deleteJob).put(testUser, updateJob);

export default router;
