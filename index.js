import express from 'express'
import cors from 'cors';
import { sequelize } from './Schema/itemSchema.js';
import getList from './Routes/fetchList.js';
import assignItems from './Routes/assignItems.js';
import returnItems from './Routes/returnItems.js';
import userItemUse from './Routes/assignedItemsToUser.js';

sequelize.authenticate().then(()=>{
    console.log(`Database connected successfully`)
}).catch((err)=>{
    console.log(`some error in database connection: ${err}`);
})

const PORT = 5001;

const app = express();
app.use(cors());
app.use(express.json());

app.use(getList);
app.use(assignItems);
app.use(returnItems);
app.use(userItemUse)

app.listen(PORT,()=>{
    console.log(`Backend is running on port: ${PORT}`)
})