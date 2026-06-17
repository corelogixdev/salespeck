const { requirePrismaClient } = require('../utils/prismaClient');
const { generateId } = require('../utils/idGenerator');

exports.index = async (req, res) => {
    try {
        const type = req.query.type; // 'vendor' or 'customer'
        if (!type) {
            return res.status(400).json({ success: false, message: 'Type is required' });
        }
        const prisma = requirePrismaClient();
        const types = await prisma.partytype.findMany({
            where: { type },
            orderBy: { name: 'asc' }
        });
        res.json({ success: true, data: types });
    } catch (error) {
        console.error('Error fetching party types:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.save = async (req, res) => {
    try {
        const { id, name, type, description } = req.body;
        const prisma = requirePrismaClient();
        let savedType;

        if (id) {
            savedType = await prisma.partytype.update({
                where: { id },
                data: { name, type, description }
            });
        } else {
            savedType = await prisma.partytype.create({
                data: {
                    id: generateId(32),
                    name,
                    type,
                    description,
                    source: 'desktop'
                }
            });
        }
        res.json({ success: true, message: 'Saved successfully', data: savedType });
    } catch (error) {
        console.error('Error saving party type:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const prisma = requirePrismaClient();
        
        // Check if any users are using this type
        const usersCount = await prisma.user.count({
            where: { fk_partytype_id: id }
        });

        if (usersCount > 0) {
            return res.status(400).json({ success: false, message: 'Cannot delete: Type is in use by parties.' });
        }

        await prisma.partytype.delete({ where: { id } });
        res.json({ success: true, message: 'Deleted successfully' });
    } catch (error) {
        console.error('Error deleting party type:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
