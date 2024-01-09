import axios from 'axios';
import { twitterConfig, oauth } from '../config';
import OpenAI from 'openai';

const twitterAxiosConfig = {
  baseURL: twitterConfig.apiEndpoint,
  headers: {
    'Content-Type': 'application/json',
  },
};

const twitterAxiosClient = axios.create(twitterAxiosConfig);

twitterAxiosClient.interceptors.request.use(async (config) => {
  if (!config.url || !config.method) {
    throw new Error('Request config must include URL and method.');
  }

  const token = {
    key: twitterConfig.accessToken.key,
    secret: twitterConfig.accessToken.secret,
  };

  try {
    const oauthData = oauth.authorize({ url: config.baseURL + config.url, method: config.method }, token);
    const oauthHeader = oauth.toHeader(oauthData);
    config.headers.Authorization = oauthHeader.Authorization;
    return config;
  } catch (error) {
    throw new Error('Error during OAuth authorization: ' + ( error as Error).message);
  }
});


//openAI
const openAi = new OpenAI({
  apiKey: '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' // This is the default and can be omitted
});

export { twitterAxiosClient, openAi };
