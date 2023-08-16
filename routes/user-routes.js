const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const {registerValidation, loginValidation} = require('../validation');

// Register
router.post("/register", (req,res,next)=>{
    User.findOne({username : req.body.username})
    .then((user)=>{
        if(user != null){

            let err =  new Error(`user ${req.body.username} already exists`)
            res.status(400)
            return next(err)
        }
        else{
            bcrypt.hash(req.body.password, 10, (err,hash)=>{
                if(err){
                    return next(err)
                }else{
                    user = new User()
                    user.name =  req.body.name,
                    user.email =  req.body.email,
                    user.password =  hash
                    if(req.body.role) user.role = req.body.role 
                    user.save().then((user)=>{
                        res.status(201).json({"reply" : "User Registered Sucessfully",
                        userId : user._id,
                        username : user.username,
                        role : user.role
                    })
                    })
                }
            })
        }
    })
   .catch(next)

})
router.post("/login",(req,res,next)=>{
    User.findOne({email : req.body.email}).then(user=>{
        if(user == null){
            res.status(404)
            let err =  new error(`User ${req.body.email} doesnot exists`)
            return next(err)
        }

        else{
            bcrypt.compare(req.body.password , user.password, 
                (err,status)=>{
                    if(err){
                        res.status(401)
                        return next(err)
                    }
                    if(!status){
                        let err =  new error("Password doesnot match")
                        return next(err)
                    }
                    let data = {
                        
                        userid :  user._id,
                        name :  user.name,
                        email :  user.email,
                        role : user.role

                    }
                    console.log(data)
                    jwt.sign(data, "jhvdhvbashdbjkshabdhi",
                        {"expiresIn": "1d"},(err,token)=>{
                            if(err){
                                return next(err)
                            }
                            else{
                                res.json({
                                "status" : "Login Successfull"
                                ,"token" : token})
                            }
                        })

            })
        }
    }).catch(next)
   
})

module.exports = router;

