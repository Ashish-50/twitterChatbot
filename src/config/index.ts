import OAuth from 'oauth-1.0a';
import crypto from 'crypto';
import dotenv from 'dotenv'
dotenv.config();

export const PORT = process.env.PORT
export const CHATAPI = process.env.CHATAPI
export const NODE_ENV = process.env.NODE_ENV
export const ORIGIN = process.env.ORIGIN
export const CREDENTIAL = process.env.CREDENTIAL === 'true'


export const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY || '';
export const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET || '';
export const TWITTER_ACCESS_TOKEN_KEY = process.env.TWITTER_ACCESS_TOKEN || '';
export const TWITTER_ACCESS_TOKEN_SECRET = process.env.TWITTER_ACCESS_TOKEN_SECRET || '';
export const TWITTER_API_ENDPOINT = process.env.TWITTER_API_ENDPOINT || '';
export const dbConnection = {
  DBURL: 'mongodb://localhost:27017/twitter',
}

export const twitterConfig = {
  consumer: {
    key: TWITTER_CONSUMER_KEY,
    secret: TWITTER_CONSUMER_SECRET,
  },
  accessToken: {
    key: TWITTER_ACCESS_TOKEN_KEY,
    secret: TWITTER_ACCESS_TOKEN_SECRET,
  },
  apiEndpoint: TWITTER_API_ENDPOINT,
};

export const oauth = new OAuth({
  consumer: twitterConfig.consumer,
  signature_method: 'HMAC-SHA1',
  hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64'),
});


