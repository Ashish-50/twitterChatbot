import { NextFunction, Request, Response } from 'express';
import { TweetCRUDService } from '../service/tweet.service';

export class tweetController {
    public tweetService = new TweetCRUDService()

    public createTweet = async (req:Request,res:Response,next:NextFunction)=>{
        try {
            const { text } = req.body;
              const newTweet = await this.tweetService.createTweet(text)
            res.status(201).json({
              status: 'success',
              message: 'Tweet added successfully',
              data: newTweet,
            });
          } catch (error) {
           next(error)
          }
    }

    public getTweets = async (req:Request,res:Response,next:NextFunction)=>{
        try {
            const tweets = await this.tweetService.getTweets();
            res.status(200).json({
              status: 'success',
              message: 'Tweets retrieved successfully',
              data: tweets,
            });
          } catch (error) {
            next(error)
          }
    }
    public updateTweet = async (req:Request,res:Response,next:NextFunction)=>{
        try {
            const { id } = req.params;
            const { newText } = req.body;
            const updatedTweet = await this.tweetService.updateTweet(id, newText);
      
            res.status(200).json({
              status: 'success',
              message: 'Tweet updated successfully',
              data: updatedTweet,
            });
          } catch (error) {
            next(error)
          }
    }
    public deleteTweet = async (req:Request,res:Response,next:NextFunction)=>{
        try {
            const { id } = req.params;
            const deletedTweet = await this.tweetService.deleteTweet(id);
      
            res.status(200).json({
              status: 'success',
              message: 'Tweet deleted successfully',
              data: deletedTweet,
            });
          } catch (error) {
            next(error)
          }
    }
}