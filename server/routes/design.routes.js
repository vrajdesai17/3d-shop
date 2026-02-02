import express from 'express';
import { saveDesign, getUserDesigns, getDesignById, updateDesign, deleteDesign } from '../controllers/design.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protect, saveDesign);
router.get('/', protect, getUserDesigns);
router.get('/:id', protect, getDesignById);
router.put('/:id', protect, updateDesign);
router.delete('/:id', protect, deleteDesign);

export default router;
