const jwt = require('jsonwebtoken');
const JWT_SECRET="supersecret_dont_share";

module.exports = (req, res, next) => {
    const cookie=req.headers.cookie;
    const token=cookie.split("=")[1];

        if(token){
            jwt.verify(String(token),JWT_SECRET,(err,user)=>{
                if(err){
                    return res.sendStatus(403);
                }
                req.user=user;
                next();
            })
        }
  
};