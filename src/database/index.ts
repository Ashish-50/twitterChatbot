
import { connect } from 'mongoose';
import {dbConnection} from '../config'


export async function connectToDatabase(){
    try {
        await connect(dbConnection.DBURL)
        console.log("database connected")
    } catch (error) {
        console.log(error)
    }
}