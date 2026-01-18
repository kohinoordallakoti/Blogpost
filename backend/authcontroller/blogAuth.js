import Blog from "../model/blogSchema.js"
import LikeBlog from "../model/likedBlogs.js";

export const createBlog = async (req, res) => {
    try{
        const {title, description, category, image, published} = req.body;
        if (!title || !description || !category) {
            return res.status(400).json({ message: "Title, description or category required" });
        }
        if(!req.file){
            return res.status(400).json ({message:"Image is required"})  
        }
        const blog = await Blog.create(
            {
                title,
                description,
                category,
                image:req.file.filename,
                published
            }
        );
        res.status(201).json({message:"Blog created successfully", blog});
    }catch(error){
        console.log(error);
    }
}


export const getAllBlogs = async (req, res) => {
  try {
    const { search } = req.query;

    let query = {};

    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
        ],
      };
    }

    const blogs = await Blog.find(query).sort({ createdAt: -1 });
    const blogsWithLikes = await Promise.all(
      blogs.map(async (blog) => {
        const likeCount = await LikeBlog.countDocuments({ blog: blog._id });
        return {
          ...blog.toObject(),
          likeCount,
        };
      })
    );

    res.status(200).json(blogsWithLikes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getSingleBlog = async(req,res) => {
    try{
        const blog =await Blog.findById(req.params.id);
        if(!blog){
            return res.status(404).json({message:"Blog not found"});
        }
        res.status(201).json({blog});
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

export const updateBlog = async ( req, res) => {
    try{
        const {title, description} = req.body;
        const blog = await Blog.findById(req.params.id);
        if(!blog){
            return res.status(404).json({message:"Blog not found"});
        }
        blog.title = title || blog.title;
        blog.description = description || blog.description;
        blog.category = category || blog.category;
        if(req.file){
            blog.image = req.file.filename;
        }
        const updatedBlog = await blog.save();
        res.status(201).json({message:"Blog updated successfully",updatedBlog});
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

export const deleteBlog = async(req,res) => {
    try{
        //    for pdf or other files
    //     const blog = await Blog.findById(req.params.id);
    // if(!blog){
    //     return res.status(404).json({message:"Blog not found"});
    // }
    // await blog.deleteOne();
           const blog = await Blog.findByIdAndDelete(req.params.id);
       res.json({message:"Blog deleted successfully"});
    }catch(error) {
        res.status(500).json({error:error.message})
    }
}

export const likeBlogs = async(req,res) => {
    const { id } = req.params;
    const userId = req.userid;
        console.log(userId);
  try {
    // Check if the blog exists
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    // Check if the user has already liked this blog
    const existingLike = await LikeBlog.findOne({ user: userId, blog: id });
    if (existingLike) {
      // If already liked, unlike the blog
      await LikeBlog.deleteOne({ user: userId, blog: id });
      const newLikeCount = await LikeBlog.countDocuments({ blog: id });
      
      return res.status(200).json({
        message: "Blog unliked",
        liked: false,
        likeCount: newLikeCount,
      });
    }
    const newLike = new LikeBlog({
      user: userId,
      blog: id,
    });
    console.log(newLike)

    await newLike.save();
    
    const newLikeCount = await LikeBlog.countDocuments({ blog: id });
    return res.status(200).json({
      message: "Blog liked successfully",
      liked: true,
      likeCount: newLikeCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

export const dislikeBlog = async(req,res) => {
    try {
    const userId = req.userid; // from auth middleware
    const { id } = req.params;    // blog ID

    if (!id) {
      return res.status(400).json({ message: "Blog ID is required" });
    }


    // Remove like
    await LikeBlog.deleteOne({ user: userId, blog: id });

    // Get updated like count
    const likeCount = await LikeBlog.countDocuments({ blog: id });

    return res.status(200).json({
      message: "Blog unliked successfully",
      liked: false,
      likeCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export const getlikeBlogs = async(req,res) => {
    try {
    const userId = req.userid;
    // Fetch all liked blogs for the user from the LikeBlog model
    const likedBlogs = await LikeBlog.find({ user: userId }).populate({
      path: "blog",
      populate: [
        {
          path: "category",
          select: "name",
        },
      ],
    });

    if (!likedBlogs.length) {
      return res.status(200).json({ likedBlogs: [] });
    }

    // Get like counts for each blog
    const blogsWithLikeCounts = await Promise.all(
      likedBlogs.filter((like) => like.blog != null).map(async (like) => {
        if (!like.blog) return null;
        
        const likeCount = await LikeBlog.countDocuments({ blog: like.blog._id });
        return {
          ...like.blog.toObject(),
          likeCount,
          isLikedByUser: true,
        };
      })
    );

    res.status(200).json({ likedBlogs: blogsWithLikeCounts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}
