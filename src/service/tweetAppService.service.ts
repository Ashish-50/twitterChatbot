import axios from "axios";
import { twitterAxiosClient } from "../utils/client";
import { ITweet, TweetModel } from "../models/tweet";

export class TweetAppService {
    public async addTweet(){
        try{
            const latestTweet = await this.fetchLatestTweetFromDB();
            if (!latestTweet) {
                throw new Error('No tweets available to post');
            }
            const tweet = {
              text:latestTweet.text
             }
             const response = await twitterAxiosClient.post(`/2/tweets`, tweet);
             if (response.status === 201) {
                 await this.deleteTweetFromDB(latestTweet.id);
     
                 const responseBody = {
                     status: 200,
                     message: "Tweet posted successfully",
                     data: response.data
                 };
                 return responseBody;
             } else {
                 throw new Error('Failed to post tweet to Twitter');
             }
          }catch(error){
              if (axios.isAxiosError(error)) {
                  console.error(error.response?.data);
                  throw new Error(error.response?.data);
                } else {
                  console.error(error);
                  throw new Error('An unexpected error occurred.');
                }
        }
    }
    public async deleteTweet(id:string){
        try{
            const response = await twitterAxiosClient.delete(`/2/tweets/${id}`)
            const responseBody = {
             status: 200,
             message:"Tweet deleted successfully",
             data: response.data
          }
          return responseBody
         }catch(error){
             console.error(error)
             throw new Error((error as Error).message);
       }
    }
    public async getUser(){
        try{
            const response = await twitterAxiosClient.get(`/2/users/me`)
            const responseBody = {
             status: 200,
             message:"",
             data: response.data
          }
          return responseBody
         }catch(error){
             console.error(error)
             throw new Error((error as Error).message);
       }
      }

    public async fetchLatestTweetFromDB(): Promise<ITweet | null> {
        try {
            const latestTweet = await TweetModel.findOne().sort({ dateAndTime: -1 }).exec();
            return latestTweet;
        } catch (error) {
            console.error('Error fetching the latest tweet from the database:', error);
            throw error;
        }
    }
    public async deleteTweetFromDB(tweetId: string): Promise<void> {
        try {
            await TweetModel.findByIdAndDelete(tweetId).exec();
        } catch (error) {
            console.error('Error deleting the tweet from the database:', error);
            throw error;
        }
    }
    }