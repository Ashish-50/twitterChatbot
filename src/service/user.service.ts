import { twitterAxiosClient } from "../utils/client";

class UserService {
  async getUser(){
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

export const userService = new UserService;