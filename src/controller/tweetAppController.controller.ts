import { NextFunction, Request, Response } from 'express';
import {TweetAppService} from '../service/tweetAppService.service'
export class TweetAppController {
    public tweetAppService = new TweetAppService();
    public addTweet = async (req: Request, res: Response, next: NextFunction) => {
        try{
         const response = await this.tweetAppService.addTweet();
         return res.status(response.status).json({
             status: "success",
             message: response.message,
             data: response.data,
           });
         } catch (error) {
            next(error)
         }
        }
    public deleteTweet = async (req:Request,res:Response,next:NextFunction) => {
        const { id } =  req.params;
        try{
         const response = await this.tweetAppService.deleteTweet(id);
         return res.status(response.status).json({
             status: "success",
             message: response.message,
             data: response.data,
           });
         } catch (error) {
           next(error)
           }
    }
    public aboutme = async (req:Request,res:Response,next:NextFunction) => {
        try{
            const response = await this.tweetAppService.getUser();
            return res.status(response.status).json({
                status: "success",
                message: response.message,
                data: response.data,
              });
            } catch (error) {
              next()
              }
    }
    }