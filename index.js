const express=require('express')

const mydb=require('./config/db')


const app=express();
const rout=require("./routes/router")
app.use(rout)

app.get("/",(req,res,next)=>{r
    es.send("farah")})
app.listen(3001,()=>{
    console.log('server is run ');
})
