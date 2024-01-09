import express from 'express'
import { tweetController } from '../controller/tweets.controller';
const router = express.Router();

router.post('/',tweetController.addTweets)
router.delete('/:id',tweetController.deleteTweets)

export default router;