import app from "./app"
import http from 'http'
import * as dotenv from 'dotenv'


dotenv.config();

const port = process.env.PORT
const startServer = () =>{
    const server: http.Server = app.listen(port, ()=>{
    console.log(`Listening on url http://localhost:${port} `)
    return server;
})};

startServer();

