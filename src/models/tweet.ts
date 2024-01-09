import mongoose, { Model, Document, Schema, model } from 'mongoose';

export interface ITweet extends Document {
    text: string;
    dateAndTime: Date;
  }
  const tweetSchema = new mongoose.Schema({
    text: {
      type: Schema.Types.String,
      required: true,
    },
    dateAndTime: {
      type: Schema.Types.Date,
      default: () => new Date(),
    }
  });
  
  export const TweetModel: Model<ITweet> = model<ITweet>('Tweet', tweetSchema);