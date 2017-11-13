const models = require('../../models');
const doAsync = require('../../lib/doAsync');
const {body, validationResult} = require('express-validator/check');
const {matchedData} = require('express-validator/filter');
const Op = require('sequelize').Op;

module.exports.main = (req, res, next) => {
  res.send({msg:'user default page'});
};

module.exports.create = doAsync( async (req, res, next) => {

  //파라미터 유효검사
  const validateResult = validationResult(req);
  if(!validateResult.isEmpty()){
    return res.status(400).send({msg: validateResult.mapped()});
  }

  const userParam = matchedData(req);
  
  //아이디 중복확인
  const exist = await models.User.findOne({where: {[Op.or]:[{username: userParam.username}, {email: userParam.email}]}});

  if(exist){
    return res.status(409).send({msg: 'username already exist'});
  }
    
  //DB 추가
  const user = await models.User.createUser(userParam);
               await models.Broadcast.createBroadcast(userParam.username);
  //토큰 생성
  const token = await user.createToken();

  res.cookie('access_token', token, {maxAge: 60 * 1000, httpOnly: true});
  res.send({
    msg: user.username+ ' is created', 
    user: {
      id: user.id,
      username: user.username,
     }
  });
  
});

module.exports.createValidator = [
  body('username').isLength({min:4, max:12}),
  body('password').isLength({min:6, max:30}),
  body('email').isEmail()
]

module.exports.loginLocal = doAsync( async (req, res, next) => {
  //파라미터 유효검사
  const validateResult = validationResult(req);

  if(!validateResult.isEmpty()){
    return res.status(400).send({msg: validateResult.mapped()});
  }
  const {email, password} = matchedData(req);

  //DB체크
  const user = await models.User.findOne({where : {email: email}});

  if(!user){
    return res.status(401).send({msg: 'no such user exist'});
  }

  //비밀번호 체크
  const result = user.comparePassword(password);

  if(!result){
    return res.status(401).send({msg: 'password is not correct'});
  }

  //토큰 생성
  const token = await user.createToken();
  
  res.cookie('access_token', token, {maxAge: 60 * 1000, httpOnly: true});
  res.send({msg : 'welcome ' + user.username, 
    user: {
      id: user.id,
      username: user.username
    }
  });
});

module.exports.loginLocalVaildator = [
  body('email').isEmail(),
  body('password').isLength({min:6, max:30})
]

module.exports.logout = (req, res, next) => {
  res.cookie('access_token', null, {maxAge: 0, httpOnly: true});
  res.status(204).send({msg: 'successfully logouted'});
}

module.exports.check = (req, res, next) => {
  const user = req.user;
  if(!user) {
    return res.status(401).send({msg: 'fail'});
  }
  return res.send({msg: 'ok', user: user});
}