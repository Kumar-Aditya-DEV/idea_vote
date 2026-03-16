const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    summary: {
      type: String,
    },
    vision: {
      type: String,
    },
    price: {
      type: String,
      enum: ['cheap', 'expensive'],
      default: 'cheap',
    },
    thumbnail: {
      type: String, // will store URL or local path
    },
    averageRating: {
      type: Number,
      default: 3,
    },
    saves: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Idea = mongoose.model('Idea', ideaSchema);

module.exports = Idea;
