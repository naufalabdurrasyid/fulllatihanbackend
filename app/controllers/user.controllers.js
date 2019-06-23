const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
const User = require('../model/user.models');
const Post = require('../model/post.models')

exports.create_user = (req, res) => {
    var user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    user.save()
        .then(result => {
            res.status(201).send({
                result: result
            })
        }
        ).catch(err => {
            res.status(500).send({
                error: err.message
            });
        });
}


    exports.show_user=(req,res,next)=>{
        User.find({_id:req.decoded._id}, (err,User)=>{
            if(err){
                res.status(422).json({
                    success: false,
                    message: 'failed',
                    error: err
                })
            }
              else{
                res.status(200).json({
                    data: User,
                    success:true,
                    message:"user found"
                });
              }  

            
                
        });
    };
    
    exports.update_user=(req,res)=>{
      User.findByIdAndUpdate(req.params.id, {$set:req.body},(err,updatedUser)=>{
          if(err){
              res.send(err)
          }else{
              res.status(200).send({
                  success:true,
                  message:"User profile is sucessfully updated"
              })
          }
      })
  }
  
  exports.user_login=(req,res)=>{
      User.findOne({username:req.body.username}, (err,user)=>{
          if(err){
              res.status(400).json({
                  success:false,
                  message: err
              })
          }else{
              console.log(user)
              bcrypt.compare(req.body.password, user.password, function(error, response){
                  if(error){
                      res.status(400).json({
                          success:false,
                          message: error
                      })
                  }else{
                      console.log(response)
                      if(response){
                          var token = jwt.sign(user.toJSON(), "secret..", {
                              algorithm:'HS256'
                          });
                          res.status(201).json({
                              message: 'You are logged in!',
                              success: true,
                              token: token
                          })
                      }else{
                          res.status(401).json({
                              message: 'failed',
                              success: false,
                              token: token
                          })
                          res.send(`password is ${response}. try again!`)
                      }
  
                  }
              })
          }
      })
  }
  exports.user_verify=(req,res)=>{ 
    jwt.verify(req.headers.authorization, 'secret..',(err,decoded)=>{
if(err){ 
    res.status(400).json({
    success:false,
    message: err
})
console.log(decoded)
}else{
    res.status(200).send(decoded)
}
    })
  
}

exports.user_post=(req,res)=>{
        const post = new Post({
            'content': req.body.content,
            'author': req.body.username  
          })   

  post.save()
  .then(result => {
      res.status(201).send({
          result: result
      })
  }
  ).catch(err => {
      res.status(500).send({
          error: err.message
      });
  })
  User.findOne({username: req.decoded.username}).
  exec(function (err, user) {
    if (err){
    res.status(400).send({
        message: err
    })
}else {
    user.posts.push(post)
    user.save()
    .then(result => {
        res.status(201).send({
            result: result
        })
    }
    ).catch(err => {
        res.status(500).send({
            error: err.message
        });
    })
}
  });
        }
    
   
