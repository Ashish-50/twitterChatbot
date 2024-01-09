import axios from "axios";
import { twitterAxiosClient } from "../utils/client";

export class TweetAppService {
    public async addTweet(text:string){
        try{
            const tweet = {
              text
             }
            const response = await twitterAxiosClient.post(`/2/tweets`,tweet);
             const responseBody = {
              status: 200,
              message:"Tweet posted successfully",
              data: response
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
    }