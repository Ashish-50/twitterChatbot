
import express from 'express';
import {Routes} from './src/interface/routes.interface'
import { Server as HttpServer } from 'http';
import { NODE_ENV, PORT,dbConnection,ORIGIN, CREDENTIAL } from './src/config';
import { connect } from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import { ErrorMiddleware } from './src/middleware/error.middleware';

export class App{
    public app:express.Express;
    public env: string;
    public port:string | number;
    private server: HttpServer | undefined;

    constructor(routes: Routes[]) {
        this.app = express()
        this.env = NODE_ENV || 'development';
        this.port = PORT || 3990;
        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        
    this.initializeErrorHandling();
    }
    public listen(){
        try {
            this.server = this.app.listen(this.port, () => {
                console.info(`=================================`);
                console.info(`======= ENV: ${this.env} =======`);
                console.info(`🚀 App listening on the port ${this.port}`);
                console.info(`=================================`);
              });
              /* Socket will never close */
              this.server.timeout = 0;
        } catch (error) {
            console.log(error);
        }
    }
    public getServer() {
        return this.app;
      }
    private async connectToDatabase() {
        try {
          console.info(dbConnection.DBURL);
          await connect(dbConnection.DBURL);
          console.info('Connected to database');
        } catch (err) {
          console.error('DB connection failed');
        }
      }
      private initializeMiddlewares() {
        this.app.use(morgan('dev'));
        this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIAL }));

       
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

      }
      private initializeRoutes(routes: Routes[]) {
        routes.forEach(route => {
          this.app.use('/', route.router);
        });
        this.app.use('/health', (req, res) => {
          res.send({
            state: 'ready',
          });
        });
      }
      private initializeErrorHandling() {
        this.app.use(ErrorMiddleware);
      }
}