import { ITweet, TweetModel } from '../models/tweet';

export class TweetCRUDService {
    public async createTweet(text:string):Promise<ITweet>{
        try {
            const newTweet = await TweetModel.create({ text });
            return newTweet
        } catch (error) {
            throw new Error("something went wrong");
            
        }
    }
    public async getTweets(page:number,limit:number){
        try {
          const skip = (page - 1) * limit;
          const tweets = await TweetModel.find()
          .sort({ dateAndTime: -1 }) 
          .skip(skip) 
          .limit(limit)
          .exec();
          return tweets;
          } catch (error) {
            throw new Error("something went wrong");
          }
    }
    public async updateTweet(id:string,newText:string){
        try {
        const updatedTweet = await TweetModel.findByIdAndUpdate(
          id,
          { text: newText },
          { new: true }
        ).exec();
  
        if (!updatedTweet) {
            throw new Error("something went wrong");
        }
  
        return updatedTweet;
      } catch (error) {
        return error;
      }}
    public async deleteTweet(id:string){
        try {
            const deletedTweet = await TweetModel.findByIdAndDelete(id).exec();
      
            if (!deletedTweet) {
                throw new Error("something went wrong");
            }
      
            return deletedTweet;
          } catch (error) {
            throw new Error("something went wrong");
          }
    }
}