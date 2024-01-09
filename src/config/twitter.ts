import OAuth from 'oauth-1.0a';
import crypto from 'crypto';
import dotenv from 'dotenv'
dotenv.config();

const PORT = process.env.PORT
const CHATAPI = process.env.CHATAPI

const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY || '';
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET || '';
const TWITTER_ACCESS_TOKEN_KEY = process.env.TWITTER_ACCESS_TOKEN || '';
const TWITTER_ACCESS_TOKEN_SECRET = process.env.TWITTER_ACCESS_TOKEN_SECRET || '';
const TWITTER_API_ENDPOINT = process.env.TWITTER_API_ENDPOINT || '';
const dbConnection = {
  DBURL: 'mongodb://localhost:27017/twitter',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
}

const twitterConfig = {
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

const oauth = new OAuth({
  consumer: twitterConfig.consumer,
  signature_method: 'HMAC-SHA1',
  hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64'),
});

export { twitterConfig, oauth, dbConnection,PORT,CHATAPI };
