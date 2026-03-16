const Comment = require('../models/Comment');
const Idea = require('../models/Idea');

// @desc    Add comment to idea
// @route   POST /api/comments
// @access  Private
const addComment = async (req, res) => {
  try {
    const { ideaId, text } = req.body;

    if (!ideaId || !text) {
      return res.status(400).json({ message: 'Idea ID and comment text are required' });
    }

    const idea = await Idea.findById(ideaId);

    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }

    const comment = await Comment.create({
      ideaId,
      userId: req.user._id,
      text: text,
    });

    const populatedComment = await Comment.findById(comment._id).populate('userId', 'name');

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get comments for specific idea
// @route   GET /api/comments/:ideaId
// @access  Public
const getCommentsByIdeaId = async (req, res) => {
  try {
    const comments = await Comment.find({ ideaId: req.params.ideaId })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await comment.deleteOne();

    res.json({ message: 'Comment removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Like a comment
// @route   POST /api/comments/:id/like
// @access  Private
const likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // A real app would track who liked it to prevent multiple likes,
    // but for simplicity we increment the count here.
    comment.likes += 1;
    await comment.save();

    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addComment,
  getCommentsByIdeaId,
  deleteComment,
  likeComment,
};
