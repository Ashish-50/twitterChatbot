import express from 'express';
import tweetRoutes from './src/routes/tweet'
import userroutes from './src/routes/user'
import {connectToDatabase} from './src/database'
import { PORT } from './src/config/twitter';
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());
connectToDatabase()


app.use('/tweets', tweetRoutes)
app.use('/user', userroutes)

const start = async () => {
    app.listen(PORT, () => console.log(`Server is fire on port ${PORT}`));
};

start();
