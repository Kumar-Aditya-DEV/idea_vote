const express = require('express');
const router = express.Router();
const {
  getIdeas,
  getIdeaById,
  createIdea,
  updateIdea,
  deleteIdea,
  upvoteIdea,
  downvoteIdea,
  getMyIdeas,
  saveIdea,
  rateIdea,
} = require('../controllers/ideaController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.route('/')
  .get(getIdeas)
  .post(protect, upload.single('thumbnail'), createIdea);

router.route('/mine').get(protect, getMyIdeas);

router.route('/:id')
  .get(getIdeaById)
  .put(protect, updateIdea)
  .delete(protect, deleteIdea);

router.route('/:id/upvote').post(protect, upvoteIdea);
router.route('/:id/downvote').post(protect, downvoteIdea);
router.route('/:id/save').post(protect, saveIdea);
router.route('/:id/rate').post(protect, rateIdea);

module.exports = router;
