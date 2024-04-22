import { Schema , model } from "mongoose";

const userSchema = new Schema({
    user_phone_number:Number,
    friends:[
        {
            type:Schema.Types.ObjectId,
            ref:"user"
        }
    ]
})

const user = model("user",userSchema);

export {user}