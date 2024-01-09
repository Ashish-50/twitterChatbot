import { Request, Response } from 'express';
import { tweetService } from '../service/tweet.service';

export const tweetController = {
    async addTweets(req: Request, res: Response){
       const { text } =  req.body;
       try{
        const response = await tweetService.addTweets(text);
        return res.status(response.status).json({
            status: "success",
            message: response.message,
            data: response.data,
          });
        } catch (error) {
          res.status(400).send({
            status: "error",
            message: error,
            data: {},
          })
        }
       },

       async deleteTweets(req: Request, res: Response){
        const { id } =  req.params;
        try{
         const response = await tweetService.deleteTweets(id);
         return res.status(response.status).json({
             status: "success",
             message: response.message,
             data: response.data,
           });
         } catch (error) {
           res.status(400).send({
             status: "error",
             message: error,
             data: {},
           })
         }
        },  

    }