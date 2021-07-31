const express=require('express');
const configSocketio=require('./socket');
const http=require('http');
const path=require('path');
const app=express();

require('dotenv').config();

app.use(express.static(path.join(__dirname,'public')));
const server = new http.Server(app);
configSocketio(server);
server.listen(process.env.PORT,(err)=>{
if(err) throw new Error(err)
console.log(`server iniciado en ${process.env.PORT}`);
})

