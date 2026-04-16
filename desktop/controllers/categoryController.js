const queries = require('../prisma/queries');
const { getPaginationMeta, buildSortClause, buildFilterClause, sanitizeFilters } = require('../utils/paginationHelper');

exports.listCategories = async (req, res) => {
    try {
        const query = req.query;

        // Pagination parameters
        const page = parseInt(query.page) || 1;
        const pageSize = parseInt(query.pageSize) || 10;

        // Filter parameters
        // Sort parameters
        const sortBy = query.sortBy || 'name';
        const sortOrder = query.sortOrder || 'asc';

        // Get total count and paginated data
        const { count, rows } = await queries.categories.list({
            page,
            pageSize,
            sortBy,
            sortOrder,
            search: query.name_like,
            status: query.status
        });

        // Generate pagination metadata
        const pagination = getPaginationMeta(page, pageSize, count);

        if (query.partial) {
            return res.render('products/category/_table_rows', {
                layout: false,
                categories: rows
            });
        }

        res.render('products/category/list', {
            title: "Categories",
            categories: rows,
            pagination,
            query,
            sortBy,
            sortOrder
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        req.session.message = {
            type: "error",
            text: "An error occurred while fetching categories."
        };
        res.redirect("/dashboard");
    }
};

exports.getCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await queries.categories.findById(id);
        
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        res.status(200).json({
            success: true,
            category: category
        });
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.saveCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Check if category already exists
        const existingCategory = await queries.categories.findByName(name);

        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: 'Category with this name already exists'
            });
        }

        const newCategory = await queries.categories.create({
            name,
            description,
            status: true,
            createdby: req.session.user.id
        });

        res.status(200).json({
            success: true,
            message: 'Category created successfully',
            category: newCategory
        });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { id, name, description, status } = req.body;

        // Check if category exists
        const category = await queries.categories.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        // Check if name is already taken by another category
        const existingCategory = await queries.categories.findByNameExceptId(name, id);

        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: 'Category name already exists'
            });
        }

        await queries.categories.update(id, {
            name,
            description,
            status,
            updatedby: req.session.user.id
        });

        res.status(200).json({
            success: true,
            message: 'Category updated successfully'
        });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.body;

        // Check if category is being used by any products
        const productsUsingCategory = await queries.products.list({
            page: 1,
            pageSize: 1,
            where: { category: id }
        });

        if (productsUsingCategory.count > 0) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete category as it is being used by products'
            });
        }

        await queries.categories.update(id, {
            status: false,
            updatedby: req.session.user.id
        });

        res.status(200).json({
            success: true,
            message: 'Category deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.searchCategories = async (req, res) => {
    try {
        const { search } = req.body;
        if (!search) {
            return res.json({ success: false, data: [] });
        }

        const categories = await queries.categories.search(search, 20);

        res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        console.error('Error searching categories:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};
