var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var middleware=require("../middleware/index.js");



//INDEX-Show all campground
router.get("/",function(req,res)
{
    res.render("landing");
});




router.get("/campgrounds",function(req,res){
    //GET ALL cAMPGROUND FROM DB
    
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campground/index",{campgrounds:allCampgrounds});
        }
    }) 
});
 
//CREATE-add NEW CAMPGROUND to db

router.post("/campgrounds",middleware.isLoggedIn,function(req,res){
    var name=req.body.name;
    var price=req.body.price;
    var image=req.body.image;
    var description=req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username}      

    var newCampground={name:name,image:image,description:description,price:price,author:author};
    Campground.create(newCampground,function(err,newlycreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    })
   
});

 
// NEW-SHOW FORM TO CREATE NEW CAMPGROUND
router.get("/campgrounds/new",middleware.isLoggedIn,function(req,res){
    res.render("campground/new");
});


// SHOW-shows more info about one campground
router.get("/campgrounds/:id",function(req,res){
    //FIND  THE CAMPGROUND WITH PROVIDED ID
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
            //RENDER SHOW TEMPLATE WITH THAT CAMPGROUND
             res.render("campground/show",{campground:foundCampground});
        }
    })
    
});

//EDIT CAMPGROUND ROUTE
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
    

    Campground.findById(req.params.id,function(err,foundCampground){
       res.render("campground/edit",{campground:foundCampground})
            });
    });


//UPDATE CAMPGROUND
router.put("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
});

//DESTROY CAMPGROUND ROUTE
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    });
});

module.exports=router;