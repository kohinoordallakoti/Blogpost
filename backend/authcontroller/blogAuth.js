import Blog from "../model/blogSchema.js"

export const createBlog = async (req, res) => {
    try{
        const {title, description, category, image} = req.body;

        if (!title || !description || !category) {
      return res.status(400).json({ message: "Title & description required" });
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
            }
        );
        res.status(201).json({message:"Blog created successfully", blog});
    }catch(error){
        console.log(error);
    }
}


export const getAllBlogs = async(req,res) => {
    try{
        const blog = await Blog.find().sort({createdAt:-1});
        res.status(201).json(blog);
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

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