import express from 'express';
import { sequelize } from '../Schema/itemSchema';

const router = express.Router();

router.get('/:rollNo/get-items', async (req, res) => {
    const rollNo = req.params.rollNo;
    try {
        const [results, metadata] = await sequelize.query(`
            SELECT 
                items.itemName,
                logs.itemId,
                SUM(CASE WHEN logs.action = 'take' THEN logs.noOfItems ELSE 0 END) - 
                SUM(CASE WHEN logs.action = 'return' THEN logs.noOfItems ELSE 0 END) AS assignedQuantity
            FROM logs
            JOIN items ON logs.itemId = items.itemId
            WHERE logs.rollNo = ?
            GROUP BY logs.itemId, items.itemName
            HAVING assignedQuantity > 0;`, {
            replacements: [rollNo],
            type: sequelize.QueryTypes.SELECT
        });

        // format the result array in format for frontend usage
        const formattedResults = results.map(item => ({
            itemName: item.itemName,
            itemId: item.itemId,
            assignedQuantity: item.assignedQuantity
        }));
        res.status(200).json({ items: formattedResults });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An unexpected error occurred while fetching the items' });
    }
});

export default router;