import mongoose from "mongoose";

const Schema = mongoose.Schema;
const postSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    createdDate:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('blog', postSchema )