var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment");
var seedDB=require("./seeds.js"); 
var passport=require("passport");
var LocalStrategy=require("passport-local");
var User=require("./models/user");
var methodOverride=require("method-override");
var flash=require("connect-flash");

//requiring routes 
var campgroundRoutes=  require("./routes/campground"),
    commentRoutes=     require("./routes/comment"),
    authRoutes=        require("./routes/index");
  




mongoose.connect("mongodb://localhost/yelp_camp_v3");




app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.set("view engine","ejs");
//seedDB();

//Passport Configuration
app.use(require("express-session")({
        secret:"Fuck off",
        resave:false,
        saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
    res.locals.CurrentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
    
});

app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(authRoutes);





const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});