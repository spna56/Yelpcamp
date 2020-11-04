var Campground=require("../models/campground");
var Comment=require("../models/comment");

var middlewareobj={}

middlewareobj.checkCampgroundOwnership=function(req,res,next){
    //isUserloggedin
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,sapna){
            if(err){
                req.flash("error","Campground not found!!")
                res.redirect("back")
            }else{
                  //does user own a campground
                if(sapna.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error","You need to logged in to do that")
        res.redirect("back");
    }}

    middlewareobj.checkCommentOwnership=function (req,res,next){
        //isUserloggedin
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id,function(err,foundComment){
                if(err){
                    
                    res.redirect("back")
                }else{
                      //does user own a comment
                    if(foundComment.author.id.equals(req.user._id)){
                        next();
                    }else{
                        req.flash("error","You don't have permission to do that");
                        res.redirect("back");
                    }
                }
            });
        }else{
            req.flash("error","You need to logged in to do that")
            res.redirect("back");
        }
      }

middlewareobj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }      
                  //key    //value
      req.flash("error","You need to logged in do to that");
      res.redirect("/login");
    
    }
  module.exports=middlewareobj;
    
