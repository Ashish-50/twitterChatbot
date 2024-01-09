import { userService } from "../service/user.service";
import { Request, Response } from 'express';

export const userController = {

    async getUser(req: Request, res: Response){
        try{
         const response = await userService.getUser();
         return res.status(response.status).json({
             status: "success",
             message: response.message,
             data: response.data,
           });
         } catch (error) {
           res.status(400).send({
             status: "error",
             message: error,
             data: {},
           })
         }
        }

}