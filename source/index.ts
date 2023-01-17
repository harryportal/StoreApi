import app from "./app"
import http from 'http'
import * as dotenv from 'dotenv'


dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
dotenv.config();

const port = process.env.PORT || 3000
const startServer = () =>{
    const server: http.Server = app.listen(port, ()=>{
    console.log(`Listening on url http://localhost:${port} `)
    return server;
})};

startServer();

