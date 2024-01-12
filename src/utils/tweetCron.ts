import { twitterAxiosClient } from "../utils/client";
import {TweetModel } from "../models/tweet";
import axios from "axios";

export const tweetCron = async()=>{
    try {
        const latestTweet = await fetchLatestTweetFromDB();
        if (!latestTweet) {
            console.log("No  more tweet to upload")
            return;
        }
        const tweet = {
          text:latestTweet.text
         }
         const response = await twitterAxiosClient.post(`/2/tweets`, tweet);
         if (response.status === 201) {
            await deleteTweetFromDB(latestTweet.id);
            return 'Tweet uploaded successfully';
        } else {
            console.log('Unexpected status code:', response.status);
            return 'Something went wrong';
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.log('Axios error response:', error.response.data);
                return `HTTP error: ${error.response.status}`;
            } else if (error.request) {
                console.log('Axios no response received:', error.request);
                return 'No response received from the server';
            } else {
                console.log('Axios request setup error:', error.message);
                return 'Error setting up the request';
            }
        } else {
            console.log('Non-Axios error:', error);
            return 'Internal server error';
        }
    }
    }

async function fetchLatestTweetFromDB (){
    try {
        const latestTweet = await TweetModel.findOne().sort({ dateAndTime: -1 }).exec();
        return latestTweet;
    } catch (error) {
        console.error('Error fetching the latest tweet from the database:', error);
        throw error;
    }
}
async function deleteTweetFromDB(tweetId: string) {
    try {
        await TweetModel.findByIdAndDelete(tweetId).exec();
    } catch (error) {
        console.error('Error deleting the tweet from the database:', error);
        throw error;
    }
}