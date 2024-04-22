import express, {urlencoded} from "express"

import {connect} from "mongoose"

import { user } from "./model/user.model.js"

import { chat } from "./model/chats.user.js"

import cookieParser from "cookie-parser"

const app = express()

app.set("view engine","ejs")

app.use(cookieParser())

app.use(urlencoded())

await connect("mongodb://127.0.0.1:27017/chat-app").then(()=>{
        app.listen(3000,'127.0.0.1')
}).catch(e=>{
    console.log(e.message);
})

app.get("/", (req,res)=>{
    res.render("index")
})

app.post("/",async (req,res)=>{
   const  userFriend = [] 
   const data =req.body ;

   const userData = await user.findOne({user_phone_number:data.user})

   console.log(userData);

   const {friends} = userData

    for(let i = 0 ; i<friends.length; i++){
        let userData = await user.findOne({_id:friends[i]})
        let redefineData = {}
        redefineData.id=userData._id
        redefineData.user_phone_number=userData.user_phone_number
        userFriend.push(redefineData)
    }

    res.cookie("id",userData._id).render("showMessage",{user:userFriend})
})
 
app.get("/onemessage",async (req,res)=>{
    try{
    const auther =await chat.find({auther:req.query.id,reciver:req.cookies.id})
    const reciver = await chat.find({auther:req.cookies.id,reciver:req.query.id})
    console.log(auther,reciver); 
    res.
    cookie("friendCookie",req.query.id).
    render("onemessage",{auther:auther, recive:reciver})
    }catch(e){
        res.send(e.message)
    }
})
app.post("/onemessage",async (req,res)=>{

    console.log(req.cookies.id);
    const {id,friendCookie}=req.cookies
     let AUTHERData= null
     let reciverData=null
    
    // if (!(AUTHERData&&reciverData)) {
    await chat.create({auther:id,contend:req.body.text,reciver:friendCookie})

    AUTHERData= await chat.find({auther:id,reciver:friendCookie})
   reciverData = await chat.find({auther:friendCookie,reciver:id})
    res.render("onemessage",{auther:AUTHERData, recive:reciverData})
   //res.redirect("/onemessage")
    AUTHERData=null
    reciverData=null
    
    
})