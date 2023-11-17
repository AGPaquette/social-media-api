const Comment = require("../models/Comments");
const User = require("../models/User");
const errorCodeComment = { error: "Comment not found" }
const errorCodeUser = { error: "User not found" }

module.exports = {
  // Get all comments

  getAllComments: async (req, res) => {
    try {
      const comments = await Comment.find();
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a comments by ID
  getCommentById: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (!comment) {
        return res.status(404).json(errorCodeComment);
      }
      res.json(comment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create a new comment
  createComment: async (req, res) =>{
    try {
      const { commentText } = req.body;
      const { userId } = req.params;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json(errorCodeUser);
      }

      const comment = await Comment.create({
        commentText,
        username: user.username,
      });

      user.comments.push(comment);
      await user.save();

      res.status(201).json(comment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Add a reaction to a comment
  addReaction: async (req, res) => {
    try {
      const { commentID } = req.params;
      const { reactionBody, username } = req.body;

      const updatedComment = await Comment.findByIdAndUpdate(
        commentID,
        {
          $push: {
            reactions: { reactionBody, username },
          },
        },
        { new: true }
      );

      if (!updatedComment) {
        return res.status(404).json(errorCodeComment);
      }

      res.status(201).json(updatedComment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Update a comment
  updateComment: async (req, res) => {
    try {
      const commenht = await Comment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!comment) {
        return res.status(404).json(errorCodeComment);
      }
      res.json(comment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete a comment
  deleteComment: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (!comment) {
        return res.status(404).json(errorCodeComment);
      }

      const user = await User.findOne({ username: comment.username });
      if (!user) {
        return res.status(404).json(errorCodeUser);
      }

      user.comments = user.comments.filter(
        (commentID) => commentID.toString() !== req.params.id
      );
      await user.save();

      await Comment.deleteOne({ _id: req.params.id });

      res.json({ message: "comment removed" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Remove a reaction from a comment
  removeReaction: async (req, res) => {
    try {
      const { commentID, reactionId } = req.params;

      const updatedComment = await Comment.findByIdAndUpdate(
        commentID,
        {
          $pull: {
            reactions: { reactionId: reactionId },
          },
        },
        { new: true }
      );

      if (!updatedComment) {
        return res.status(404).json(errorCodeComment);
      }

      res.json(updatedComment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
