import express from 'express';
import { sequelize } from '../Schema/itemSchema';

const router = express.Router();

router.put('/new-item', async (req, res) => {
  const itemId = req.body.itemId;
  const nameOfItem = req.body.nameOfItem;
  const totalNumberOfItems = req.body.totalNumberOfItems;

  try {
    // Check if the item already exists
    const item = await sequelize.query(
      'SELECT * FROM Items WHERE itemId = ?',
      {
        replacements: [itemId],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (item.length > 0) {
      // If item exists, update noOfItemsAvailable
      await sequelize.query(
        'UPDATE Items SET noOfItemsAvailable = noOfItemsAvailable + ? WHERE itemId = ?',
        {
          replacements: [totalNumberOfItems, itemId],
          type: sequelize.QueryTypes.UPDATE,
        }
      );
    } else {
      // If item does not exist, insert a new item
      await sequelize.query(
        'INSERT INTO Items (itemId, nameOfItem, totalNumberOfItems, noOfItemsAvailable) VALUES (?, ?, ?, ?)',
        {
          replacements: [itemId, nameOfItem, totalNumberOfItems, totalNumberOfItems],
          type: sequelize.QueryTypes.INSERT,
        }
      );
    }

    res.status(200).send({ message: 'Item updated/added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while updating/adding the item' });
  }
});

export default router;