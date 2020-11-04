var mongoose=require("mongoose");

var commentSchema=new mongoose.Schema({
    text:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,  //reference to the user model id
            ref:"User"
        },
        username:String  
    }
});

module.exports=mongoose.model("Comment",commentSchema);