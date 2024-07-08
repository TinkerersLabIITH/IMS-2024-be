import express from 'express';
import { sequelize } from '../Schema/itemSchema';

const router = express.Router();

router.put('/return', async (req,res)=>{
    const rollNo = req.body.rollNo;
    const listToAdd = req.body.list;
    
    const transaction = await sequelize.transaction();
    try {
        for (const item of listToAdd) {
            const itemId = item.itemId
            const assignedQuantity = item.assignedQuantity;

            await sequelize.query(`
                UPDATE Items
                SET noOfItemsAvailable = noOfItemsAvailable + :assignedQuantity
                WHERE itemId = :itemId
            `, {
                replacements: { assignedQuantity, itemId },
                transaction
            });

            await sequelize.query(`
                INSERT INTO Logs (date, rollNo, itemId, itemName, quantity, transaction)
                VALUES (NOW(), :rollNo, :itemId, :itemName, :assignedQuantity, 'return')
            `, {
                replacements: { rollNo, itemId, itemName, assignedQuantity },
                transaction
            });
        }

        await transaction.commit();
        res.status(200).json({ message: 'Items returned successfully' });
    } catch (err) {
        await transaction.rollback();
        console.error(err);
        res.status(500).json({ message: 'An error occurred while processing the return', error: err.message });
    }
})