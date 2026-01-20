import Comment from "../model/comment.js";

export const getComments = async (req, res) => {
  try {
    const { blogId } = req.params;

    // if (!blogId) {
    //   return res.status(400).json({ message: "Blog ID is required" });
    // }

    const comments = await Comment.find({ blog: blogId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch comments",
    });
  }
};

export const createComment = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { comment } = req.body;
    const userId = req.userid;

    const newComment = await Comment.create({
      user: userId,
      blog: blogId,
      comment,
    });

    const populatedComment = await newComment.populate("user", "name");

    res.status(201).json({
      message: "Comment added",
      comment: populatedComment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userid; 
    console.log(id)
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Comment.findByIdAndDelete(id);

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
