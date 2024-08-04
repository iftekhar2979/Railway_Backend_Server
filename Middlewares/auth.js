const jwt = require('jsonwebtoken');
const TOKEN='88b16e0e2b6436b915fef2856c119522968bf2fca9a676e7fff06184501f2dbbd0e04fe456cca63f6e41743905a5aec46bcd3032b130fb4b612a606bc59441a8'

const auth = (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    return res.status(403).send({ error: 'UnAuthorized access' });
  }
  const token = authHeaders.split(' ')[1];

  

  jwt.verify(token, TOKEN, function (error, decoded) {
    if (error) {
      console.log("16 ",error)
      return res.status(403).send({ error: 'UnAuthorized Access' });
    }
    req.decoded = decoded;
    console.log(jwt.decoded)
    
    next();
  });
};

module.exports={auth}