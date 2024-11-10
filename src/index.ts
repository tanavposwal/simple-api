import 'dotenv/config';
import express, { Request, Response } from 'express';
import mongoose from "mongoose";
import { User } from "./db";
import { fakerEN } from '@faker-js/faker';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Simple API by tanav with dockerized mongodb, you can add user to db here "/add"');
});

app.get('/data', async (req: Request, res: Response) => {
  const data = await User.find()
  res.json(data);
});

app.get('/add', async (req: Request, res: Response) => {
  try {
    const newUser = new User({
      name: fakerEN.person.firstName(),
      bio: 'This is a sample user bio.'
    });

    const result = await newUser.save();

    res.send('User added to the database with ID: ' + result._id);
  } catch (error) {
    res.status(500).send('Failed to add user');
  }
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
mongoose.connect(process.env.MONGO_URL || "", { dbName: "users"});