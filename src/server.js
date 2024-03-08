import express from 'express'
import bodyParser from 'body-parser'
import viewEngine from './config/viewEngine'
import initWebRoutes from './route/web'
import connectDB from './config/connnectDB'
import cors from 'cors'
require('dotenv').config();

let app = express();

// config app
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json({ limit: '35mb' }))
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '35mb',
    parameterLimit: 50000,
}))

viewEngine(app);
initWebRoutes(app);

connectDB();
let port = process.env.PORT || 6969;
app.listen(port, () => {
    //callback
    console.log("BackEnd NodeJS is running on the port: " + port)
})
