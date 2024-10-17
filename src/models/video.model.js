import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import mongoose,{model, Schema} from "mongoose";

const videoSchema = new Schema(
    {
        videoFile:{
            type:String,
            required:true,
            unique:true
        },
        thumbnail:{
            type:String,
            required:true
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:User
        },
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        duration:{
            type:Number,
            required:true
        },
        views:{
            type:Number,
            required:true
        },
        isPublished:{
            type:Boolean,
            default:false
        }


    },{timeStamps:true})

videoSchema.plugin(mongooseAggregatePaginate)

    export const Video = mongoose.model("Video",videoSchema)