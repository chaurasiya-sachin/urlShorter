import express from "express";
import { nanoid } from 'nanoid'
import  fs  from "fs";



const app = express();

app.use(express.json())
app.use(express.urlencoded())

app.get("/",(req,res)=>{
    res.sendFile(import.meta.dirname + "/index.html")
})

app.post("/long-to-short",(req,res)=>{
    // console.log(req.body.longUrl);
    const uniqueId = nanoid(8)
    const shortUrl ="https://urlshorter-xfvn.onrender.com/"+ uniqueId;
    const fileData =fs.readFileSync("url-data.json")
   const urlObj = JSON.parse(fileData.toString())

   urlObj[uniqueId]=req.body.longUrl;
   fs.writeFileSync("url-data.json",JSON.stringify(urlObj))
    
    res.json({
        success:true,
        data:shortUrl
    })
})
app.get("/:shortUrl",(req,res)=>{
    const uniqueId = req.params.shortUrl;
    const fileData = fs.readFileSync("url-data.json")
    const urlObj = JSON.parse(fileData)
    const longUrl = urlObj[uniqueId]
    // console.log(longUrl);
    

    res.redirect(longUrl)
})

app.listen(5000,()=>console.log(`server is up and running at port 5000`))