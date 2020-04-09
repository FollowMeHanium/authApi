const jwt = require('jsonwebtoken');
const refreshToken = require('../redis_config');
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    try {
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        return next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            var refreshtoken=refreshToken.get(req.headers.authorization);
            var token=jwt.sign({
                id : user.id,
                nickname : user.nickname,
                status : user.status,
              },
              process.env.JWT_SECRET,
              {
                  expiresIn : '60m',
                  issuer : 'comeOn',
              });

              if(refreshToken==null){
                return res.status(419).json({
                    resultCode: 419,
                    meesage: "토큰 만료"
                });
              }

            if(req.body.refreshToken==refreshtoken){
                return res.json({
                    code:200,
                    message : '토큰이 발급되었습니다.',
                    token
                })
            }else{
                return res.json({
                    code:400,
                    message : 'Refresh 토큰이 변조되었습니다.',
                })
            }
        }
        return res.status(401).json({
            resultCode: 401,
            message: "토큰이 유효하지 않습니다."
        })
    }   
}
