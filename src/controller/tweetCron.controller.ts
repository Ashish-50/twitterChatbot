import { NextFunction, Request, Response } from 'express';
import {TweetAppService} from '../service/tweetAppService.service'
import cron from 'node-cron';
import { twitterAxiosClient } from '../utils/client';
let cronJob: cron.ScheduledTask | null= null;
export class TweetCronController {
    public tweetAppService = new TweetAppService();
    public startCron = async (req: Request, res: Response, next: NextFunction) => {
        try {
          if (cronJob === null) {
            cronJob = cron.schedule('*/1 * * * *', async () => {
              try {
                console.log('Running task every 5 minutes');
      
                // Fetch the latest tweet from the database
                const latestTweet = await this.tweetAppService.fetchLatestTweetFromDB();
      
                if (!latestTweet) {
                  console.log('No more tweets to process. Stopping cron job.');
                  if (cronJob !== null) {
                    cronJob.stop();
                    cronJob = null;
                  }
                  return;
                }
      
                const tweet = {
                  text: latestTweet.text,
                };
      
                const response = await twitterAxiosClient.post(`/2/tweets`, tweet);
      
                if (response.status === 201) {
                  await this.tweetAppService.deleteTweetFromDB(latestTweet.id);
      
                  console.log('Tweet posted successfully');
                } else {
                  console.error('Failed to post tweet to Twitter');
                }
      
              } catch (error) {
                console.error('Error during cron job:', error);
                // Stop the cron job if an error occurs
                if (cronJob !== null) {
                  cronJob.stop();
                  cronJob = null;
                }
              }
            });
      
            res.send({ message: 'Cron job started', status: true });
          } else {
            res.send('Cron job is already running');
          }
        } catch (error) {
          next(error);
        }
      }

    public stopCron = async (req:Request,res:Response,next:NextFunction)=>{
        try {
            if (cronJob !== null) {
                cronJob.stop();
                cronJob = null;
                res.send({message:'Cron job stopped',status:false});
            } else {
                res.send('No cron job is running');
            }
        } catch (error) {
            next(error)
        }
    }
}