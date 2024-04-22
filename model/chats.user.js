import { Schema , model } from "mongoose";

const chatSchema = new Schema({
    auther:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    contend:{
        type:String,
    },
    reciver:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
})

const chat = model("chat",chatSchema)

export {chat}