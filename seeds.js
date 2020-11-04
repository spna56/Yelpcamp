var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment");
var data=[
    {name:"Cloud's Rest",
    image:"https://invinciblengo.org/photos/event/slider/manali-summer-adventure-camp-himachal-pradesh-q3zyMTV-1440x810.JPG",
    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {name:"Desert Mesa",
    image:"https://invinciblengo.org/photos/event/slider/manali-summer-adventure-camp-himachal-pradesh-q3zyMTV-1440x810.JPG",
    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {name:"Wild Camp",
    image:"https://invinciblengo.org/photos/event/slider/manali-summer-adventure-camp-himachal-pradesh-q3zyMTV-1440x810.JPG",
    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
]


module.exports=function seedDB(){
    //Remove Campgrounds
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }else{
            console.log("removed campgrounds");
            //add a few campground
          /*data.forEach(function(seed){
                Campground.create(seed,function(err,campground){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("added Campgrounds");
                        Comment.create({
                            text:"This place is great,but i wish there was internet",
                            author:"Homer"
                        },function(err,comment){
                            if(err){
                                console.log(err);
                            }else{
                                 campground.comments.push(comment); //assciating comment with campground
                                 campground.save();
                                 console.log("comments added");
                            }
                        })
                    }
                })
            })*/
        }
    });

    
   
}