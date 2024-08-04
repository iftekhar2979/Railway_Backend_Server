const jwt = require('jsonwebtoken');
const user = require('../Model/user');

const auth = (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    return res.status(403).send({ error: 'UnAuthorized access' });
  }
  const token = authHeaders.split(' ')[1];

  

  jwt.verify(token, process.env.SECRET_TOKEN, function (error, decoded) {
    if (error) {
      console.log("16 ",error)
      return res.status(403).send({ error: 'UnAuthorized Access' });
    }
    req.decoded = decoded;
 
    next();
  });
};

const adminAuth = async(req, res, next) => {

  const decodedId = req.decoded.user.id;

    const findEmail = await user.findById(decodedId);
    if (findEmail.role !== 'admin') {
      return res.send({ error: 'UnAuthorized access ' });
    }
  next();
};

module.exports={auth,adminAuth}