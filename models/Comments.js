const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Reaction Schema (nested schema)
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
      trim: true,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => {
        // Use a getter method to format the timestamp on query
        return new Date(createdAt).toISOString();
      },
    },
  },
  {
    toJSON: {
      getters: true, // Enable the getter method for JSON conversion
    },
  }
);

// Comment Schema
const commentSchema = new Schema(
  {
    commentText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema], // Array of nested reaction documents
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create a virtual property `reactionCount` to retrieve the length of the comment's reactions array
commentSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;