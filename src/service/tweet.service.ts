import axios from "axios";
import { twitterAxiosClient } from "../utils/client";

class TweetService {

async addTweets(text:string){
    try{
       const tweetData = {
        text
       }
       const response = await twitterAxiosClient.post(`/2/tweets`,tweetData)
       const responseBody = {
        status: 200,
        message:"Tweet posted successfully",
        data: response.data
     }
     return responseBody
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

async deleteTweets(id:string){
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

}

export const tweetService = new TweetService;