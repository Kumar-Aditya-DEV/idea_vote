const mongoose = require('mongoose');

const saveSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

// Prevent user from saving multiple times
saveSchema.index({ ideaId: 1, userId: 1 }, { unique: true });

const Save = mongoose.model('Save', saveSchema);

module.exports = Save;
