const express = require("express")
const { MongoClient, ObjectId } = require("mongodb")
const multer =require("multer")
const upload=multer()
const sanitizeHTML=require("sanitize-html")
const sharp=require("sharp")
const fse=require("fs-extra")
const path=require("path")

const app= express()
var db
app.set("view engine","ejs")
app.use(express.static("public"))

fse.ensureDir(path.join("public","memophoto"))
const start= ()=>{
  const client=new MongoClient("mongodb://localhost:27017/trean")
  client.connect()
  db=client.db()
  app.listen("3000",()=>console.log("the app is  runing on port 3000"))
}
start()
const passwordPotected=(req,res,next)=>{
  res.set("www-Authenticate","Basic realm='my metn app'")
  if(req.headers.authorization == "Basic Y2xhc3N5OmFkbWlu"){
    next()
  }else{
    console.log(req.headers.authorization)
    res.status(401).send("try again later man")
  }
}
app.get("/",async(req,res)=>{
  res.render("home")

})
app.use(passwordPotected)
app.get("/admin",(req,res)=>{
  res.render("admin")
})

app.get("/get-memori",async(req,res)=>{
  const memo=await db.collection("memories").fild().array()
  res.send(memo)

})

app.post("/add-memory",upload.single("file"),clean,async(req,res)=>{
  if(req.file){
    const newmemo= `${Date.now()}.jpg`
    sharp(req.file.buffer).resize(400,500).toFile(path.join("public","memophoto",newmemo))
    req.cleandata.file=newmemo
  }
  const newinfo= await db.collection("memories").insertOne(req.cleandata)
  const newi= await db.collection("memories").findOne({_id:new ObjectId(newinfo.insertedId) })
  res.send(newi)
})

function clean(req,res,next){
  if(typeof req.body.date != "string")req.body.date =""
  if(typeof req.body.addres != "string")req.body.addres=""
  if(typeof req.body.discription !="string") req.body.discription= ""

  req.cleandata={
    date:sanitizeHTML(req.body.date.trim(),{allowedAttributes:{},allowedTags:[]}),
    addres:sanitizeHTML(req.body.addres.trim(),{allowedAttributes:{}, allowedTags:[]}),
    discription:sanitizeHTML(req.body.discription.trim(),{allowedAttributes:{}, allowedTags:[]})
  }
}