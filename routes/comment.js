var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var Comment=require("../models/comment");
var middleware=require("../middleware");



//============
//COMMENT ROUTES

//COMMENTS NEW
router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }else{
          res.render("comment/new",{campground:campground});
        }
    })
      
  });
  
  //COMMENTS CREATE
  router.post("/campgrounds/:id/comments",middleware.isLoggedIn, function(req,res){
      Campground.findById(req.params.id,function(err,campground){
          if(err){
              console.log(err);
          }else{
                Comment.create(req.body.comment,function(err,comment){
                    if(err){
                        req.flash("error","Something went wrong");
                        console.log(err)
                    }else{
                        //add username  and id to the comment
                        comment.author.id=req.user._id
                        comment.author.username=req.user.username
                        //saving the comment
                        comment.save();
                        campground.comments.push(comment);
                        campground.save();
                        console.log(comment);
                        req.flash("success","Successfully added comment");
                        res.redirect("/campgrounds/"+campground._id);
                    }
                });
          }
          
      });
  });

  //Comment EDIT ROUTE
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership,function(req,res){
  Comment.findById(req.params.comment_id,function(err,foundComment){    //idher iska text chaiye template me 
    if(err){
      res.redirect("back");
    }else{
      res.render("comment/edit",{campground_id:req.params.id,comment:foundComment});
    }
  })
  
});

//COMMENT UPDATE ROUTE
router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
      if(err){
        res.redirect("back")
      }else{
        res.redirect("/campgrounds/"+req.params.id);
      }
    })
});

//COMMENT DESTROY ROUTE
router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership,function(req,res){
  Comment.findByIdAndRemove(req.params.comment_id,function(err){
    if(err){
      res.redirect("/campgrounds/"+req.params.id);
    }else{
      req.flash("success","Comment deleted")
      res.redirect("/campgrounds/"+req.params.id);
    }
  })
});

module.exports=router;
