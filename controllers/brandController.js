const { Op } = require('sequelize');
const db = require('../models');

exports.listBrands = async (req, res) => {
    try {
        const brands = await db.brand.findAll({
            order: [['name', 'ASC']]
        });
        res.render('products/brand/list', { 
            title: "Brands",
            brands 
        });
    } catch (error) {
        console.error('Error fetching brands:', error);
        req.session.message = { 
            type: "error", 
            text: "An error occurred while fetching brands." 
        };
        res.redirect("/dashboard");
    }
};

exports.saveBrand = async (req, res) => {
    try {
        const { name, description } = req.body;
        
        // Check if brand already exists
        const existingBrand = await db.brand.findOne({ 
            where: { name: name } 
        });
        
        if (existingBrand) {
            return res.status(400).json({ 
                success: false, 
                message: 'Brand with this name already exists' 
            });
        }

        const newBrand = await db.brand.create({
            name,
            description,
            status: true,
            createdby: req.session.user.id
        });

        res.status(200).json({ 
            success: true,
            message: 'Brand created successfully',
            brand: newBrand 
        });
    } catch (error) {
        console.error('Error creating brand:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal Server Error' 
        });
    }
};

exports.updateBrand = async (req, res) => {
    try {
        const { id, name, description, status } = req.body;

        // Check if brand exists
        const brand = await db.brand.findByPk(id);
        if (!brand) {
            return res.status(404).json({ 
                success: false, 
                message: 'Brand not found' 
            });
        }

        // Check if name is already taken by another brand
        const existingBrand = await db.brand.findOne({
            where: {
                name: name,
                id: { [Op.ne]: id }
            }
        });

        if (existingBrand) {
            return res.status(400).json({ 
                success: false, 
                message: 'Brand name already exists' 
            });
        }

        await db.brand.update({
            name,
            description,
            status,
            updatedby: req.session.user.id
        }, {
            where: { id }
        });

        res.status(200).json({ 
            success: true, 
            message: 'Brand updated successfully' 
        });
    } catch (error) {
        console.error('Error updating brand:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal Server Error' 
        });
    }
};

exports.deleteBrand = async (req, res) => {
    try {
        const { id } = req.body;
        
        // Check if brand is being used by any products
        const productsUsingBrand = await db.product.findOne({
            where: { brand: id }
        });

        if (productsUsingBrand) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete brand as it is being used by products'
            });
        }

        await db.brand.update({
            status: false,
            updatedby: req.session.user.id
        }, {
            where: { id }
        });

        res.status(200).json({ 
            success: true, 
            message: 'Brand deleted successfully' 
        });
    } catch (error) {
        console.error('Error deleting brand:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal Server Error' 
        });
    }
};

exports.searchBrands = async (req, res) => {
    try {
        const { search } = req.body;
        if (!search) {
            return res.json({ success: false, data: [] });
        }

        const brands = await db.brand.findAll({
            where: {
                status: true,
                name: { [Op.like]: `%${search}%` }
            },
            order: [['name', 'ASC']]
        });

        res.status(200).json({ 
            success: true, 
            data: brands 
        });
    } catch (error) {
        console.error('Error searching brands:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal Server Error' 
        });
    }
};
