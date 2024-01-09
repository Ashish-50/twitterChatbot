
import { connect, ConnectOptions } from 'mongoose';
import {dbConnection} from '../config/twitter'

console.log(dbConnection,"--------------------")

export async function connectToDatabase(){
    try {
        await connect(dbConnection.DBURL,dbConnection.options as ConnectOptions)
        console.log("database connected")
    } catch (error) {
        console.log(error)
    }
}