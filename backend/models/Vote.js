const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema(
  {
    ideaId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Idea',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    voteType: {
      type: String,
      required: true,
      enum: ['upvote', 'downvote'],
    },
  },
  {
    timestamps: true,
  }
);

// Prevent user from voting multiple times on the same idea
voteSchema.index({ ideaId: 1, userId: 1 }, { unique: true });

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
