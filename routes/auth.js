var express = require('express');
var router = express.Router();
var {User} = require('../models');
var bcrypt = require('bcryptjs');
var crypto = require('crypto'); 
const jwt = require('jsonwebtoken');

var isEmpty = function (value) {
  if (value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)) {
    return true
  } else {
    return false
  }
};

/* GET users listing. */
router.get('/login', function(req, res, next) {
  var {email,password} = req.body;
  email='wlsdn110@gmail.com';
  password='root';
  User.findOne({
    where:{email:email}
  })
  .then(result=>{
    if(isEmpty(result)){
      res.json({
        code:400,
        message:"Email 또는 비밀번호를 확인해주세요."
      });
    }else{
      let hashpassword=crypto.createHash('sha512').update(password+result.salt).digest('base64');
      console.log(hashpassword==result.password);
      if(hashpassword==result.password){
        token=jwt({
          
        })
        res.send('login');
      }
    }
  });
});

router.post('/join',async function(req, res, next) {
  var {email,nickname,password} = req.body;
  await User.findOne({where:{
    email:email
  }})
  .then(async result=>{
    if(isEmpty(result)!=false){
      var salt = Math.round((new Date().valueOf() * Math.random())) + "";
      var hashpassword = crypto.createHash('sha512').update(password+salt).digest('base64');
      await User.create({
        email:email,
        nickname:nickname,
        password:hashpassword,
        salt:salt
      })
      .then(result=>{
        res.json({
          code:200,
          message:"Join Success"
        });
      })
    }else{
      //req.flash('joinError', '이미 가입된 이메일입니다.');
      return res.status(400).send("이미 가입된 메일입니다.");
    }
  });
});

module.exports = router;
