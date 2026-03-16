const express = require('express');
const router = express.Router();
const {
  addComment,
  getCommentsByIdeaId,
  deleteComment,
  likeComment,
} = require('../controllers/commentController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .post(protect, addComment);

router.route('/:ideaId')
  .get(getCommentsByIdeaId);

router.route('/:id')
  .delete(protect, deleteComment);

router.route('/:id/like')
  .post(protect, likeComment);

module.exports = router;
