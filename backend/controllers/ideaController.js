const Idea = require('../models/Idea');
const Vote = require('../models/Vote');
const Save = require('../models/Save');
const Rating = require('../models/Rating');

// @desc    Get all ideas with pagination, search, filtering, sorting
// @route   GET /api/ideas
// @access  Public
const getIdeas = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, category, tag, sort } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (category) {
      query.category = category;
    }

    if (tag) {
      query.tags = tag;
    }

    let sortOption = { createdAt: -1 }; // newest by default
    if (sort === 'upvotes') {
      sortOption = { upvotes: -1 };
    } else if (sort === 'newest') {
      sortOption = { createdAt: -1 };
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const totalIdeas = await Idea.countDocuments(query);
    const ideas = await Idea.find(query)
      .populate('createdBy', 'name')
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    res.json({
      ideas,
      totalIdeas,
      currentPage: pageNum,
      totalPages: Math.ceil(totalIdeas / limitNum),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single idea
// @route   GET /api/ideas/:id
// @access  Public
const getIdeaById = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id).populate('createdBy', 'name');

    if (idea) {
      res.json(idea);
    } else {
      res.status(404).json({ message: 'Idea not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create an idea
// @route   POST /api/ideas
// @access  Private
const createIdea = async (req, res) => {
  try {
    const { title, description, category, tags, price, summary, vision } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    let parsedTags = [];
    if (tags) {
      // Tags might be sent as JSON string if sending FormData
      try { parsedTags = JSON.parse(tags); } catch { parsedTags = tags; }
    }

    const idea = new Idea({
      title,
      description,
      category,
      tags: parsedTags,
      price,
      summary,
      vision,
      thumbnail: req.file ? `/uploads/${req.file.filename}` : req.body.thumbnail,
      createdBy: req.user._id,
    });

    const createdIdea = await idea.save();

    res.status(201).json(createdIdea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an idea
// @route   PUT /api/ideas/:id
// @access  Private
const updateIdea = async (req, res) => {
  try {
    const { title, description, category, tags } = req.body;

    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }

    if (idea.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this idea' });
    }

    idea.title = title || idea.title;
    idea.description = description || idea.description;
    idea.category = category || idea.category;
    idea.tags = tags || idea.tags;

    const updatedIdea = await idea.save();

    res.json(updatedIdea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an idea
// @route   DELETE /api/ideas/:id
// @access  Private
const deleteIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }

    if (idea.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this idea' });
    }

    await idea.deleteOne();

    res.json({ message: 'Idea removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upvote an idea
// @route   POST /api/ideas/:id/upvote
// @access  Private
const upvoteIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }

    const existingVote = await Vote.findOne({ ideaId: idea._id, userId: req.user._id });

    if (existingVote) {
      if (existingVote.voteType === 'upvote') {
        return res.status(400).json({ message: 'You have already upvoted this idea' });
      } else {
        // Change downvote to upvote
        existingVote.voteType = 'upvote';
        await existingVote.save();
        idea.downvotes -= 1;
        idea.upvotes += 1;
        await idea.save();
        return res.json({ message: 'Vote changed to upvote', idea });
      }
    }

    // New upvote
    await Vote.create({ ideaId: idea._id, userId: req.user._id, voteType: 'upvote' });
    idea.upvotes += 1;
    await idea.save();

    res.json({ message: 'Idea upvoted', idea });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Downvote an idea
// @route   POST /api/ideas/:id/downvote
// @access  Private
const downvoteIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }

    const existingVote = await Vote.findOne({ ideaId: idea._id, userId: req.user._id });

    if (existingVote) {
      if (existingVote.voteType === 'downvote') {
        return res.status(400).json({ message: 'You have already downvoted this idea' });
      } else {
        // Change upvote to downvote
        existingVote.voteType = 'downvote';
        await existingVote.save();
        idea.upvotes -= 1;
        idea.downvotes += 1;
        await idea.save();
        return res.json({ message: 'Vote changed to downvote', idea });
      }
    }

    // New downvote
    await Vote.create({ ideaId: idea._id, userId: req.user._id, voteType: 'downvote' });
    idea.downvotes += 1;
    await idea.save();

    res.json({ message: 'Idea downvoted', idea });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's ideas
// @route   GET /api/ideas/mine
// @access  Private
const getMyIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find({ createdBy: req.user._id })
      .populate('createdBy', 'name avatar')
      .sort({ createdAt: -1 });
    res.json(ideas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle save idea
// @route   POST /api/ideas/:id/save
// @access  Private
const saveIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: 'Idea not found' });

    const existingSave = await Save.findOne({ ideaId: idea._id, userId: req.user._id });
    if (existingSave) {
      await existingSave.deleteOne();
      idea.saves = Math.max(0, idea.saves - 1);
      await idea.save();
      return res.json({ message: 'Idea unsaved', idea });
    }

    await Save.create({ ideaId: idea._id, userId: req.user._id });
    idea.saves += 1;
    await idea.save();

    res.json({ message: 'Idea saved', idea });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Rate an idea
// @route   POST /api/ideas/:id/rate
// @access  Private
const rateIdea = async (req, res) => {
  try {
    const { value } = req.body;
    if (!value || value < 1 || value > 5) {
      return res.status(400).json({ message: 'Provide a valid rating between 1 and 5' });
    }

    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: 'Idea not found' });

    const existingRating = await Rating.findOne({ ideaId: idea._id, userId: req.user._id });
    if (existingRating) {
      existingRating.value = value;
      await existingRating.save();
    } else {
      await Rating.create({ ideaId: idea._id, userId: req.user._id, value });
    }

    // Recalculate average
    const allRatings = await Rating.find({ ideaId: idea._id });
    const avg = allRatings.reduce((acc, item) => acc + item.value, 0) / allRatings.length;
    idea.averageRating = Math.round(avg * 10) / 10;
    await idea.save();

    res.json({ message: 'Rating applied', idea });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
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
};
