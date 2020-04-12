const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const { User } = require('../models');

var isEmpty = function (value) {
    if (value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)) {
      return true
    } else {
      return false
    }
  };

module.exports = (passport) => {
    passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
    }, async (email, password, done) => {
      try {
        const exUser = await User.findOne({ where: { email } });
        console.log(!isEmpty(exUser));
        if (!isEmpty(exUser)) {
          let dbPassword = exUser.password;
          let salt = exUser.salt;
          let hash = crypto.createHash("sha512").update(password + salt).digest('base64');
          const result = (dbPassword === hash);
          console.log(result);
          //const result = await bcrypt.compare(password, exUser.password);
          
          if (result) {
            done(null, exUser);
          }
          
          else {
            done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
          }
        } 
        
        else {
          done(null, false, { message: '가입되지 않은 회원입니다.' });
        }
      } catch (error) {
        console.error(error);
        done(error);
      }
    }));
};