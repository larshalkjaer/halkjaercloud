const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).
  catch(error => console.log(`MongoDB error: ${error}`));

const connection = mongoose.connection;
connection.once('open', () => {
    console.log(`MongoDB connection established`);
})

const todoRouter = require('./routes/todos');
app.use('/todo', todoRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
