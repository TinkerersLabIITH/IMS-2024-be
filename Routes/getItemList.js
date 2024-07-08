import express from 'express';
import { sequelize } from '../Schema/itemSchema';

const router = express.Router();

router.get('/get-items', async (req, res) => {
  try {
    const [results, metadata] = await sequelize.query(`
      SELECT itemId, itemName, noOfItemsAvailable AS quantityAvailable
      FROM Items
      WHERE noOfItemsAvailable > 0
    `);

    // format the array for frontend
    const formattedResults = results.map(item => ({
        itemId: item.itemId,
        itemName: item.itemName,
        quantityAvailable: item.quantityAvailable
    }));

    res.status(200).json({ list: formattedResults });
  } catch (err) {
    console.log(err);
    res.status(500).json({ list: [], message: 'Some unexpected error occurred while fetching the list' });
  }
});

export default router;
