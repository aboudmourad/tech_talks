var mongoose = require("mongoose");
var User = mongoose.model('User');
var TechTalk = mongoose.model('TechTalk');
const {check, validationResult} = require('express-validator/check');



function createUser(req, res, next) {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
         return res.status(422).json({ errors: errors.mapped() });
    } else {
        const user = new User(req.body);
        user.password = user.hashPassword(user.password);
        user.save((err) => {
            if (err) {
            console.log('Error saving user: ', user);
            return next();    
            }
            res.json({ok: true});
        })
    }
   }


   var validateRegister = () => {
    return [
            check('fullName', 'Please enter your full name without numbers and longer then 4 char.').not().isEmpty().isLength({ min: 4 }).matches(/^([A-z]|\s)+$/),
            check('email', 'Your email is not valid').isEmail(),
            check('description', 'Your description is empty, try another one.').not().isEmpty(),
            check('password', 'Your password should be longer then 8 char.')
                  .isLength({ min: 8 }),
            check('confirmPassword', 'Your password and confirm are not matched.')
                  .custom( (value, {req}) => value === req.body.password)
        ];
}
   

var validateCreatePost = () => {
    return [
            check('title', 'Your Title should be at least 10 Char without numbers .').isLength({ min: 10 }).matches(/^([A-z]|\s)+$/),
            check('summary', 'Your summary should be at least 10 Char').isLength({ min: 10 }),
            check('description', 'Your description is empty, try another one.').isEmpty(),
            check('story', 'Your story should be longer then 80 char.')
                  .isLength({ min: 80 }),
            check('keywords', 'There must be at least one tag listed in Keywords.').not().isEmpty()
                  
        ];
};

   function createTechTalk(req, res, next) {
       console.log(req.body.TechTalk);
    //    console.log('sess '+ req.session.user);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.mapped()});
    } else {
       if(req.session.user){
       const techTalk = new TechTalk(req.body);
       techTalk.user_id= req.session.user._id;
       techTalk.save((err) => {
           if (err) {
           console.log('Error saving user: ', techTalk);
           return next();    
           }
           res.json({ok: true});
       })
    }
}
   }

   function getAllUsers(req, res, next) {
    User.find({}, ['fullName','description', 'email'], (err, users) => {
        if (err) {
            console.log('Error getting user: ', err);
            return next();    
            }
            res.json(users);
    })
    }

   getAllTechTalks = (req, res, next) => {
    const techTalk = new TechTalk(req.body);
    TechTalk.find({})
       .populate('user_id')
       .then((TechTalk)=>{res.send({
           list: TechTalk,
           isUser: req.session.user
       })})
       .catch((err)=>{res.send(err)})
       }

     showOneTechTalk= (req, res) =>
      {
        //    console.log(req.session.user);
        TechTalk.findById({_id:req.params.id})
        .populate('user',['fullName','email'])
        .then((techTalk)=>{res.json(techTalk)})
        .catch((error)=>{res.json(error)})
    }


    
      
    var validateLogin = () => {
        return [
                check('email', 'Your email is not valid').isEmail(),
                check('email', 'Your email is not exist, please register.')
                .custom(value => User.findOne({email: value}).then(user => user)),
                check('password', 'Your password should be minmum 8 char.')
                      .isLength({ min: 8 })
            ];
    };


function loginUser( req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.mapped()});
    } else {
       User.findOne({email : req.body.email}, (err, user) => {
           if (err) {
               console.log('Error getting user: ', err);
               return next();
           }
        
           if(!user) {
               return res.status(404).json({err : true, message : "User dose not exist"})
           };
           if(!user.comparePassword(req.body.password, user.password)) {
               return res.status(404).json({err: true, message:"Passwords do not match"});
           }
           req.session.user= user;
           res.json(user)
       })
    }
   }


function logout(req,res , next) {
   req.session.destroy((err) => {
       if(err) {
           console.log('Error logging out: ', err);
           return next();
       }
       res.json({ok : true})
})
};


function getAuthenticateUserName(req,res, next) {
   res.json({name:req.session.user.fullName});
}

function authenticateUser(req,res, next) {
   if(req.session.user) return next();
   res.json({err:true, message:"Not Authenticated"});
}

function deletePost(req, res) {
    TechTalk.findOneAndRemove({_id:req.params.id})
    .then((res)=>{res.send( res)})
    .catch((err)=>{res.send(err)})
  };

  function updatingPost(req, res) {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(422).json({errors: errors.mapped()});
    // } else {
        TechTalk.findById(req.params.id)
      .then(function(techTalk) {
        techTalk.title = req.body.title;
        techTalk.keywords = req.body.keywords;
        techTalk.summary = req.body.summary;
        techTalk.story = req.body.story;
        techTalk.save().then(function(techTalk) {
          res.send(techTalk);
        });
      })
      .catch(err => res.send(err));
    // }
  };

  function likePost(req,res){
    TechTalk.findById(req.params.id).then(function(techTalk) {
        techTalk.like = techTalk.like + 1;
        techTalk.save().then(function(techTalk) {
            res.send(techTalk);
        })
        .catch(err => res.send(err));
    })
}

function disLikePost(req,res){
    TechTalk.findById(req.params.id).then(function(techTalk) {
        techTalk.like = techTalk.like - 1;
        techTalk.save().then(function(techTalk) {
            res.send(techTalk);
        })
        .catch(err => res.send(err));
    })
}
module.exports= {
   createUser,
   createTechTalk,
   getAllTechTalks,
   loginUser,
   logout,
   authenticateUser,
   getAuthenticateUserName,
   getAllUsers,
   showOneTechTalk,
   validateRegister,
   validateLogin,
   validateCreatePost,
   deletePost,
   updatingPost,
   likePost,
   disLikePost
};