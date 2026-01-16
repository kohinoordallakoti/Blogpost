import Category from "../model/categorySchema.js";

export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const category = await Category.create({
            name,
            description,
        });
        res.status(201).json({ message: "Category created successfully", category });
    } catch (error) {
        console.log(error);
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        category.name = name || category.name;
        category.description = description || category.description;
        const updatedCategory = await category.save();
        res.status(201).json({ message: "Category updated successfully", updatedCategory });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        res.status(201).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getSingleCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(201).json({ category });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};