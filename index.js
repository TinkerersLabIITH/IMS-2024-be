import express from 'express'
import cors from 'cors';
import { sequelize } from './Schema/itemSchema.js';
import getList from './Routes/getItemList.js';
import addItems from './Routes/addItems.js';
import student from './Routes/studentRecords.js';
import newItem from './Routes/addNewItem.js';
import returnItem from './Routes/returnItems.js'

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
app.use(student);
app.use(newItem);
app.use(addItems);
app.use(returnItem);

app.listen(PORT,()=>{
    console.log(`Backend is running on port: ${PORT}`)
})