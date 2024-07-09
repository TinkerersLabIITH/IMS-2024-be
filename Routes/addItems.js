import express from 'express';
import { sequelize } from '../Schema/itemSchema';

const router = express.Router();

router.put('/add-items',async (req,res)=>{
    const rollNo = req.body.rollNo;
    const listToAdd = req.body.list;
    try{
        // start a query writer
        const transaction = await sequelize.transaction();
        
        for(const item of listToAdd){
            const itemId = item.itemId
            const assignedQuantity = item.assignedQuantity;

            // Update the number of available items in the Items table
            await sequelize.query(
                `
                UPDATE Items
                SET noOfItemsAvailable = noOfItemsAvailable - :assignedQuantity
                WHERE itemId = :itemId
                `,
                {
                replacements: { assignedQuantity, itemId },
                transaction
                }
            );

            // Insert the transaction into the logs table
            await sequelize.query(
                `
                INSERT INTO Logs (date, rollNo, itemId, itemName, quantity, transaction)
                VALUES (NOW(), :rollNo, :itemId, :itemName, :assignedQuantity, 'take')
                `,
                {
                replacements: { rollNo, itemId, itemName, assignedQuantity },
                transaction
                }
            );
            await transaction.commit();

            res.status(200).json({message: "updated changes successfully"});
        }
    } catch(err){
        console.log(err);
        if (transaction) await transaction.rollback();
        res.status(500).json({message: "An error occurred while updating items and logs"});
    }
})

export default router;